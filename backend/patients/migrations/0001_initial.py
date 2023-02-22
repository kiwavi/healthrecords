# Generated by Django 4.1.7 on 2023-02-22 19:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Counties',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('county_name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Facilities',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('facility_name', models.CharField(max_length=70)),
                ('street', models.CharField(max_length=80)),
                ('county', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='patients.counties')),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=30)),
                ('second_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('street', models.CharField(max_length=60)),
                ('date_of_birth', models.DateField()),
                ('race', models.CharField(choices=[('White', 'WHITE'), ('Black', 'BLACK'), ('Asian/Pacific Islander', 'ASIAN/PACIFIC ISLANDER'), ('Unknown', 'UNKNOWN')], max_length=30)),
                ('sex', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], max_length=20)),
                ('hispanic_or_latino', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No'), ('Unknown', 'Unknown')], max_length=10)),
                ('county', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='patients.counties')),
                ('facility', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='patients.facilities')),
            ],
        ),
    ]
