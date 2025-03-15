using System;

namespace cs_src
{
    public class DeliveryCar : Cars
    {

        private int cargoCapacity; 
        private int currentLoad; 

        public DeliveryCar(int speed, int fuelConsumption, string color, int cargoCapacity)
            : base(speed, fuelConsumption, color)
        {
            this.cargoCapacity = cargoCapacity;
            this.currentLoad = 0; 
        }

        public void LoadCargo(int weight)
        {
            if (currentLoad + weight <= cargoCapacity)
            {
                currentLoad += weight;
                Console.WriteLine(weight + " kg loaded. Current load: " + currentLoad + " kg.");
            }
            else
            {
                Console.WriteLine("Cannot load " + weight + " kg. Exceeds cargo capacity.");
            }
        }

        public void UnloadCargo(int weight)
        {
            if (weight <= currentLoad)
            {
                currentLoad -= weight;
                Console.WriteLine(weight + " kg unloaded. Current load: " + currentLoad + " kg.");
            }
            else
            {
                Console.WriteLine("Cannot unload " + weight + " kg. Current load is only " + currentLoad + " kg.");
            }
        }

        public int CargoCapacity
        {
            get { return cargoCapacity; }
        }

        public int CurrentLoad
        {
            get { return currentLoad; }
        }

        public override void DisplayInfo()
        {
            base.DisplayInfo();
            Console.WriteLine("Cargo Capacity: " + cargoCapacity + " kg");
            Console.WriteLine("Current Load: " + currentLoad + " kg");
        }
    }
}
