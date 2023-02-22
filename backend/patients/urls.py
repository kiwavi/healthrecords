from django.urls import re_path, path, include
from rest_framework.routers import DefaultRouter
from .views import PatientsViewSet, FacilityViewSet, CountiesViewSet, CountiesViewSetReadOnly
from . import views


router = DefaultRouter()
router.register("patients", PatientsViewSet, basename="patients")
router.register("facilities", FacilityViewSet, basename="facilities")
router.register("counties", CountiesViewSet, basename="counties")
router.register('all_counties', CountiesViewSetReadOnly, basename="counties_read")
router.register("facilities_read", FacilityViewSet, basename="facilities_read")

patients_urlpatterns = [
    re_path(r'^api/', include(router.urls)),
]
