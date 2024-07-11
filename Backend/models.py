from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from flask_login import UserMixin
from flask_bcrypt import Bcrypt

from config import db

bcrypt = Bcrypt()

# Models go here!

class Album(db.Model, SerializerMixin):
    __tablename__ = 'albums'
    serialize_rules = ('-reviews',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    artist = db.Column(db.String(100), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    cover_image = db.Column(db.String(255), nullable=True)
    embed_link = db.Column(db.String(255), nullable=True)
    popularity = db.Column(db.Integer, nullable=True)
    label = db.Column(db.String(100), nullable=True)
    tracks = db.Column(db.Text, nullable=True)
    reviews = db.relationship('Review', backref='album',)


class Member(db.Model, SerializerMixin):
    __tablename__ = 'members'
    serialize_rules = ('-reviews',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    join_date = db.Column(db.DateTime, default=func.now(), nullable=False)
    reviews = db.relationship('Review', backref='member')
    
    @property
    def is_active(self):
        return True
    
    @property
    def is_authenticated(self):
        return True
    
    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def get_id(self):
        return str(self.id)
    


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey('members.id'), nullable=False)
    review_date = db.Column(db.DateTime, default=func.now(), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=False)

    def __init__(self, album_id, member_id, rating, comment):
        self.album_id = album_id
        self.member_id = member_id
        self.rating = max(1, min(5, int(rating)))
        self.comment = comment
        