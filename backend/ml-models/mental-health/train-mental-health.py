# train_mental_health.py
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.neural_network import MLPClassifier

# 1) Load dataset
df = pd.read_csv("mental_health.csv")  # columns: Q1,Q2,...,Qn,Outcome
df.columns = [c.lower() for c in df.columns]

# 2) Handle missing values
numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
numeric_cols.remove("outcome")  # exclude target

imputer = SimpleImputer(strategy="median")
df[numeric_cols] = imputer.fit_transform(df[numeric_cols])

# 3) Split data
X = df.drop("outcome", axis=1)
y = df["outcome"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 4) Build preprocessing + model pipeline
preprocessor = ColumnTransformer([
    ("num", Pipeline([("scaler", StandardScaler())]), numeric_cols)
])

clf = Pipeline([
    ("pre", preprocessor),
    ("model", MLPClassifier(hidden_layer_sizes=(64,32), max_iter=500, random_state=42))
])

# 5) Train
clf.fit(X_train, y_train)

# 6) Evaluate
y_pred = clf.predict(X_test)
y_proba = clf.predict_proba(X_test)[:,1]

print(classification_report(y_test, y_pred))
print("ROC AUC:", roc_auc_score(y_test, y_proba))

# 7) Save model
joblib.dump(clf, "mental_health_pipeline.pkl")
print("Saved mental_health_pipeline.pkl")