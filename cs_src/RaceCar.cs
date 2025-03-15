using System;

namespace cs_src
{
    public class RaceCar : Cars
    {
        private double aerodynamics; 
        private bool boostEnabled;

        public RaceCar(int speed, int fuelConsumption, string color, double aerodynamics, bool boostEnabled)
            : base(speed, fuelConsumption, color)
        {
            this.aerodynamics = aerodynamics;
            this.boostEnabled = boostEnabled;
        }

        public void EnableBoost()
        {
            if (boostEnabled)
            {
                int boostAmount = 50;
                Speed += boostAmount;
                Console.WriteLine("Boost mode activated! Speed increased by " + boostAmount + " km/h.");
            }
            else
            {
                Console.WriteLine("This race car does not have a boost feature.");
            }
        }

        public void OptimizePerformance()
        {
            Console.WriteLine("Optimizing performance with aerodynamics coefficient of " + aerodynamics + ".");
            if (aerodynamics > 1.5)
            {
                Console.WriteLine("High aerodynamics, top speed increased.");
                Speed += 10; 
            }
            else
            {
                Console.WriteLine("Standard aerodynamics, no change in speed.");
            }
        }

        public double Aerodynamics
        {
            get { return aerodynamics; }
            set { aerodynamics = value; }
        }

        public override void DisplayInfo()
        {
            base.DisplayInfo();
            Console.WriteLine("Aerodynamics: " + aerodynamics);
            Console.WriteLine("Boost Enabled: " + (boostEnabled ? "Yes" : "No"));
        }
    }
}
