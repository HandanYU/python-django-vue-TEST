from django.urls import path
from .views import *

urlpatterns = [
    path(r"add_book/", add_book, ),
    path(r"show_books/", show_books, ),
    path(r"delete_book/", delete_book, ),
]
