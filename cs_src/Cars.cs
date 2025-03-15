using System;

namespace cs_src
{
    public class Cars
    {
        private int speed; 
        private int fuelConsumption; 
        private string color;

        public Cars(int speed, int fuelConsumption, string color)
        {
            this.speed = speed;
            this.fuelConsumption = fuelConsumption;
            this.color = color;
        }

        public void Accelerate(int increase)
        {
            speed += increase;
            Console.WriteLine("Accelerating... New speed is " + speed + " km/h.");
        }

        public void Brake(int decrease)
        {
            if (speed - decrease >= 0)
            {
                speed -= decrease;
            }
            else
            {
                speed = 0; 
            }
            Console.WriteLine("Braking... New speed is " + speed + " km/h.");
        }

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

        public void DisplayInfo()
        {
            Console.WriteLine("Car Details:");
            Console.WriteLine("Speed: " + speed + " km/h");
            Console.WriteLine("Fuel Consumption: " + fuelConsumption + " L/100km");
            Console.WriteLine("Color: " + color);
        }
    }
}
