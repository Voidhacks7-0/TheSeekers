# train_diabetes.py
import pandas as pd, numpy as np, joblib
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.metrics import classification_report, roc_auc_score

df = pd.read_csv("diabetes.csv")  # columns: Pregnancies,Glucose,BloodPressure,SkinThickness,Insulin,BMI,DiabetesPedigreeFunction,Age,Outcome

df.columns = [c.lower() for c in df.columns]
df = df.rename(columns={"diabetespedigreefunction":"pedigree","bloodpressure":"blood_pressure",
                        "skinthickness":"skin_thickness","pregnancies":"pregnancies","age":"age","insulin":"insulin","bmi":"bmi","glucose":"glucose"})

cols_with_zero_invalid = ["glucose","blood_pressure","skin_thickness","insulin","bmi"]
df[cols_with_zero_invalid] = df[cols_with_zero_invalid].replace(0, np.nan)

imputer = SimpleImputer(strategy="median")
df[cols_with_zero_invalid] = imputer.fit_transform(df[cols_with_zero_invalid])

X = df.drop("outcome", axis=1)
y = df["outcome"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

numeric_cols = X.select_dtypes(include=[np.number]).columns.tolist()

from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.compose import ColumnTransformer

preprocessor = ColumnTransformer([("num", Pipeline([("scaler", StandardScaler())]), numeric_cols)])

clf = Pipeline([("pre", preprocessor), ("model", RandomForestClassifier(n_estimators=200, random_state=42))])
clf.fit(X_train, y_train)

y_pred = clf.predict(X_test)
y_proba = clf.predict_proba(X_test)[:,1]
print(classification_report(y_test, y_pred))
print("ROC AUC:", roc_auc_score(y_test, y_proba))

joblib.dump(clf, "diabetes_pipeline.pkl")
print("Saved diabetes_pipeline.pkl")