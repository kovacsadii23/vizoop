using System;

namespace cs_src
{
    public class OffRoad : Cars
    {
        private int groundClearance;
        private bool fourWheelDrive;

        public OffRoad(int speed, int fuelConsumption, string color, int groundClearance, bool fourWheelDrive)
            : base(speed, fuelConsumption, color)
        {
            this.groundClearance = groundClearance;
            this.fourWheelDrive = fourWheelDrive;
        }

        public void ActivateFourWheelDrive()
        {
            if (fourWheelDrive)
            {
                Console.WriteLine("Four-wheel drive activated!");
            }
            else
            {
                Console.WriteLine("This vehicle does not support four-wheel drive.");
            }
        }

        public void AdaptToTerrain(string terrainType)
        {
            Console.WriteLine("Adapting to " + terrainType + " terrain...");
            if (terrainType.Equals("rocky", StringComparison.OrdinalIgnoreCase))
            {
                Console.WriteLine("Increasing ground clearance for rocky terrain.");
            }
            else if (terrainType.Equals("muddy", StringComparison.OrdinalIgnoreCase))
            {
                Console.WriteLine("Activating traction control for muddy terrain.");
            }
            else
            {
                Console.WriteLine("Standard adaptation applied.");
            }
        }

        public int GroundClearance
        {
            get { return groundClearance; }
            set { groundClearance = value; }
        }

        public override void DisplayInfo()
        {
            base.DisplayInfo();
            Console.WriteLine("Ground Clearance: " + groundClearance + " cm");
            Console.WriteLine("Four-Wheel Drive: " + (fourWheelDrive ? "Yes" : "No"));
        }
    }
}
