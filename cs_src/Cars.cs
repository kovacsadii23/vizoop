using System;

namespace cs_src
{
    public class Cars
    {
        // Properties of the car
        private int speed; // km/h
        private int fuelConsumption; // liters per 100 km
        private string color;

        // Constructor
        public Cars(int speed, int fuelConsumption, string color)
        {
            this.speed = speed;
            this.fuelConsumption = fuelConsumption;
            this.color = color;
        }

        // Method to accelerate the car
        public void Accelerate(int increase)
        {
            speed += increase;
            Console.WriteLine("Accelerating... New speed is " + speed + " km/h.");
        }

        // Method to brake the car
        public void Brake(int decrease)
        {
            if (speed - decrease >= 0)
            {
                speed -= decrease;
            }
            else
            {
                speed = 0; // Ensure speed doesn't go below 0
            }
            Console.WriteLine("Braking... New speed is " + speed + " km/h.");
        }

        // Properties (Getters and Setters)
        public int Speed
        {
            get { return speed; }
            set { speed = value; }
        }

        public int FuelConsumption
        {
            get { return fuelConsumption; }
            set { fuelConsumption = value; }
        }

        public string Color
        {
            get { return color; }
            set { color = value; }
        }

        // Display car information
        public void DisplayInfo()
        {
            Console.WriteLine("Car Details:");
            Console.WriteLine("Speed: " + speed + " km/h");
            Console.WriteLine("Fuel Consumption: " + fuelConsumption + " L/100km");
            Console.WriteLine("Color: " + color);
        }
    }
}
