from django.urls import path
from contact.api.views import ContactsView, ContactView

urlpatterns = [
    path('contacts/', ContactsView.as_view()),
    path('contacts/<int:pk>/', ContactView.as_view()),
]