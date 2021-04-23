from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect
from .config import Config

app = Flask(__name__)

csrf = CSRFProtect(app)
csrf.init_app(app)

db = SQLAlchemy(app)

app.config.from_object(Config)
from app import views