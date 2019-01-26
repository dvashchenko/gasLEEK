import pandas as pd

df = pd.read_csv("cvs/PET_PRI_GND_A_EPM0_PTE_DPGAL_W/Data 1-Table 1.csv")

for i in range(1, len(df)):
    dateVal = df.iat[i,0]
    gasVal = df.iat[i,1]
    day, month, year = dateVal.split("-")

    if(month == "Jan"):
        month = 1
    elif (month == "Feb"):
        month = 2
    elif (month == "Mar"):
        month = 3
    elif (month == "Apr"):
        month = 4
    elif (month == "May"):
        month = 5
    elif (month == "Jun"):
        month = 6
    elif (month == "Jul"):
        month = 7
    elif (month == "Aug"):
        month = 8
    elif (month == "Sep"):
        month = 9
    elif (month == "Oct"):
        month = 10
    elif (month == "Nov"):
        month = 11
    elif (month == "Dec"):
        month = 12

    dateVal = day + "/" + str(month) + "/" + year
    df.iat[i,0] = dateVal

    gasVal = round(gasVal,3)
    df.iat[i,1] = gasVal

df.to_csv(r'weeklyNew.csv', header = None, index = None, sep = ",", )