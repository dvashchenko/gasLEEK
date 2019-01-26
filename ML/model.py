import numpy as np
import pandas as pd
from pandas import read_csv
from pandas import datetime
from pandas import DataFrame
from pandas import concat
from pandas import Series
from keras.models import Sequential
from keras.layers import Dense, LSTM
from keras.wrappers.scikit_learn import KerasRegressor
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import KFold
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from math import sqrt
import matplotlib.pyplot as plt

# fix seed for reproducibility
np.random.seed(7)
# data processing
# all grades all formulations
path = "../data/cvs/PET_PRI_GND_A_EPM0_PTE_DPGAL_W/Data 1-Table 1.csv"
# skipping empty data and reading into pandas dataframe
data = pd.read_csv(path)
columns = data.columns
index = data.index
values = data.values

X = data["Price"].values
train, test = X[0:-12], X[-12:]

# walk-forward validation
history = [x for x in train]
predictions = list()
for i in range(len(test)):
        # make prediction...
    predictions.append(history[-1])
    # observation
    history.append(test[i])

rmse = sqrt(mean_squared_error(test, predictions))
# print('RMSE: %.3f' % rmse)
# plt.plot(test)
# plt.plot(predictions)
# plt.show()

# frame a sequence as a supervised learning problem


def timeseries_to_supervised(data, lag=1):
    df = DataFrame(data)
    columns = [df.shift(i) for i in range(1, lag+1)]
    columns.append(df)
    df = concat(columns, axis=1)
    df.fillna(0, inplace=True)
    return df


series = read_csv(path, header=0,
                  parse_dates=[0], index_col=0, squeeze=True)
# transform to supervised learning
X = series.values
supervised = timeseries_to_supervised(X, 1)
print(supervised)

# create a differenced series
def difference(dataset, interval=1):
    diff = list()
    for i in range(interval, len(dataset)):
        value = dataset[i] - dataset[i - interval]
        diff.append(value)
    return Series(diff)

# invert differenced value
def inverse_difference(history, yhat, interval=1):
    return yhat + history[-interval]

# load dataset
def parser(x):
    return datetime.strptime('190'+x, '%Y-%m')


series = read_csv(path, header=0,
                  parse_dates=[0], index_col=0, squeeze=True)
print(series.head())
# transform to be stationary
differenced = difference(series, 1)
print(differenced.head())
# invert transform
inverted = list()
for i in range(len(differenced)):
    value = inverse_difference(series, differenced[i], len(series)-i)
    inverted.append(value)
inverted = Series(inverted)
print(inverted.head())
