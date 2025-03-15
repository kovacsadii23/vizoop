using System;

namespace cs_src
{
    public class OffRoad : Cars
    {
        private int groundClearance;
        private bool fourWheelDrive;

        // Constructor
        public OffRoad(int speed, int fuelConsumption, string color, int groundClearance, bool fourWheelDrive)
            : base(speed, fuelConsumption, color)
        {
            this.groundClearance = groundClearance;
            this.fourWheelDrive = fourWheelDrive;
        }

        // Method to activate four-wheel drive
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

        // Method to adapt to different terrain types
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

        // Property for ground clearance
        public int GroundClearance
        {
            get { return groundClearance; }
            set { groundClearance = value; }
        }

        // Override the DisplayInfo method to include OffRoad-specific details
        public override void DisplayInfo()
        {
            base.DisplayInfo();
            Console.WriteLine("Ground Clearance: " + groundClearance + " cm");
            Console.WriteLine("Four-Wheel Drive: " + (fourWheelDrive ? "Yes" : "No"));
        }
    }
}
