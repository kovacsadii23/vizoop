using System;

namespace cs_src
{
    public class DeliveryCar : Cars
    {
        // Unique attributes for DeliveryCar
        private int cargoCapacity; // Maximum capacity in kg
        private int currentLoad; // Current load in kg

        // Constructor
        public DeliveryCar(int speed, int fuelConsumption, string color, int cargoCapacity)
            : base(speed, fuelConsumption, color)
        {
            this.cargoCapacity = cargoCapacity;
            this.currentLoad = 0; // Default to an empty load
        }

        // Method to load cargo
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

        // Method to unload cargo
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

        // Property for cargo capacity
        public int CargoCapacity
        {
            get { return cargoCapacity; }
        }

        // Property for current load
        public int CurrentLoad
        {
            get { return currentLoad; }
        }

        // Override the DisplayInfo method to include DeliveryCar-specific details
        public override void DisplayInfo()
        {
            base.DisplayInfo();
            Console.WriteLine("Cargo Capacity: " + cargoCapacity + " kg");
            Console.WriteLine("Current Load: " + currentLoad + " kg");
        }
    }
}
