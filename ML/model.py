import numpy as np
import pandas as pd
from keras.models import Sequential
from keras.layers import Dense, LSTM
from keras.wrappers.scikit_learn import KerasRegressor
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import KFold
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt

# fix seed for reproducibility
np.random.seed(7)
# data processing
# all grades all formulations
path = "/Volumes/X/GitHub/gasLEEK/data/cvs/PET_PRI_GND_A_EPM0_PTE_DPGAL_W/Data 1-Table 1.csv"
# skipping empty data and reading into pandas dataframe
data = pd.read_csv(path)
columns = data.columns
index = data.index
values = data.values

X = data['Date']  # input
y = data['Price']  # output

data.plot()
plt.show()

# print(X)
# print(y)

# split into train and test sets
# train_size = int(len(data) * 0.67)
# test_size = len(data) - train_size
# train, test = data[0:train_size,:], data[train_size:len(data),:]
# print(len(train), len(test))


# model build
model = Sequential()
# model.add(LSTM(50, activation='relu', input_shape=(n_steps, n_features)))
model.add(Dense(1))
model.compile(optimizer='adam', loss='mse')
