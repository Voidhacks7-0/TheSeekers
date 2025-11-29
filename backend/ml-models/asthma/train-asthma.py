# train_asthma.py
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.ensemble import RandomForestClassifier
from imblearn.over_sampling import SMOTE

# 1) Load dataset
df = pd.read_csv("asthma.csv")  # columns: Age,Gender,Wheeze,Cough,...,Outcome
df.columns = [c.lower() for c in df.columns]

# 2) Handle missing numeric values
numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
numeric_cols.remove("outcome")  # exclude target
imputer = SimpleImputer(strategy="median")
df[numeric_cols] = imputer.fit_transform(df[numeric_cols])

# 3) Encode categorical
cat_cols = df.select_dtypes(include=["object","category"]).columns.tolist()
cat_cols = [c for c in cat_cols if c != "outcome"]

# 4) Split
X = df.drop("outcome", axis=1)
y = df["outcome"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 5) Handle imbalance with SMOTE
smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

# 6) Build pipeline
preprocessor = ColumnTransformer([
    ("num", Pipeline([("scaler", StandardScaler())]), numeric_cols),
    ("cat", Pipeline([("ohe", OneHotEncoder(handle_unknown="ignore"))]), cat_cols)
])

clf = Pipeline([
    ("pre", preprocessor),
    ("model", RandomForestClassifier(n_estimators=200, random_state=42))
])

# 7) Train
clf.fit(X_train_res, y_train_res)

# 8) Evaluate
y_pred = clf.predict(X_test)
y_proba = clf.predict_proba(X_test)[:,1]

print(classification_report(y_test, y_pred))
print("ROC AUC:", roc_auc_score(y_test, y_proba))

# 9) Save model
joblib.dump(clf, "asthma_pipeline.pkl")
print("Saved asthma_pipeline.pkl")