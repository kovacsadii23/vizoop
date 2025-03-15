using System;

namespace cs_src
{
    public class RaceCar : Cars
    {
        // Unique attributes for RaceCar
        private double aerodynamics; // Efficiency coefficient
        private bool boostEnabled;

        // Constructor
        public RaceCar(int speed, int fuelConsumption, string color, double aerodynamics, bool boostEnabled)
            : base(speed, fuelConsumption, color)
        {
            this.aerodynamics = aerodynamics;
            this.boostEnabled = boostEnabled;
        }

        // Method to enable boost mode
        public void EnableBoost()
        {
            if (boostEnabled)
            {
                int boostAmount = 50;
                Speed += boostAmount; // Using the Speed property for setter
                Console.WriteLine("Boost mode activated! Speed increased by " + boostAmount + " km/h.");
            }
            else
            {
                Console.WriteLine("This race car does not have a boost feature.");
            }
        }

        // Method specific to handling performance
        public void OptimizePerformance()
        {
            Console.WriteLine("Optimizing performance with aerodynamics coefficient of " + aerodynamics + ".");
            // Simulate performance optimization
            if (aerodynamics > 1.5)
            {
                Console.WriteLine("High aerodynamics, top speed increased.");
                Speed += 10; // Using the Speed property for setter
            }
            else
            {
                Console.WriteLine("Standard aerodynamics, no change in speed.");
            }
        }

        // Property for aerodynamics
        public double Aerodynamics
        {
            get { return aerodynamics; }
            set { aerodynamics = value; }
        }

        // Override the DisplayInfo method to include RaceCar-specific details
        public override void DisplayInfo()
        {
            base.DisplayInfo();
            Console.WriteLine("Aerodynamics: " + aerodynamics);
            Console.WriteLine("Boost Enabled: " + (boostEnabled ? "Yes" : "No"));
        }
    }
}
