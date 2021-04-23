from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import StringField, TextAreaField, SelectField, DecimalField, PasswordField
from wtforms.validators import DataRequired, Email

class NewUser(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators = [DataRequired()])
    name = StringField('Fullname', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    location = StringField('Location', validators=[DataRequired()])
    biography = TextAreaField('Biography', validators=[DataRequired()])
    photo = FileField('Photo', validators=[FileRequired(), FileAllowed(['jpg', 'png', 'jpeg'], 'Images only!')])

class NewCar(FlaskForm):
    make = StringField('Make', validators=[DataRequired()])
    model = StringField('Model', validators = [DataRequired()])
    colour = StringField('Colour', validators=[DataRequired()])
    year = StringField('Year', validators=[DataRequired()])
    price = DecimalField('Price', validators=[DataRequired()])
    car_type = SelectField(u'Car Type', choices=[('SUV', 'SUV'), ('....', '....')])
    transmission = StringField('Transmission', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    photo = FileField('Photo', validators=[FileRequired(), FileAllowed(['jpg', 'png'], 'Images only!')])