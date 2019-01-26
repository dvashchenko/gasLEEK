import pandas as pd

df = pd.read_csv("cvs/PET_PRI_GND_A_EPM0_PTE_DPGAL_W/Data 1-Table 1.csv", usecols=[1])

total = 0
tankSize = 300
timesFilled = 200
numOfWorkers = 3500000

for i in range(2, len(df)):
    dif = df.iat[i,0] - df.iat[i - 1,0]
    total += dif


volatileNum = total/(len(df))
savedMoney = timesFilled * tankSize * volatileNum

print(savedMoney)