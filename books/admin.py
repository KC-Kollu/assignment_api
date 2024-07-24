from django.contrib import admin
from .models import Book, Review  # Import the models

class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published_date')
    fields = ('title', 'author', 'description', 'published_date', 'image')  # Include the image field

admin.site.register(Book, BookAdmin)
admin.site.register(Review)
