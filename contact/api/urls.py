from django.urls import path
from contact.api.views import ContactsView, ContactView

urlpatterns = [
    path('contacts/', ContactsView.as_view()),
    path('contacts/<str:pk>', ContactView.as_view()),
]