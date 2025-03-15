package java_src;
public class Cars {
        // Properties of the car
        private int speed; // km/h
        private int fuelConsumption; // liters per 100 km
        private String color;
    
        // Constructor
        public Cars(int speed, int fuelConsumption, String color) {
            this.speed = speed;
            this.fuelConsumption = fuelConsumption;
            this.color = color;
        }
    
        // Method to accelerate the car
        public void accelerate(int increase) {
            speed += increase;
            System.out.println("Accelerating... New speed is " + speed + " km/h.");
        }
    
        // Method to brake the car
        public void brake(int decrease) {
            if (speed - decrease >= 0) {
                speed -= decrease;
            } else {
                speed = 0; // Ensure speed doesn't go below 0
            }
            System.out.println("Braking... New speed is " + speed + " km/h.");
        }
    
        // Getters
        public int getSpeed() {
            return speed;
        }
    
        public int getFuelConsumption() {
            return fuelConsumption;
        }
    
        public String getColor() {
            return color;
        }
    
        // Setters
        public void setSpeed(int speed) {
            this.speed = speed;
        }
    
        public void setFuelConsumption(int fuelConsumption) {
            this.fuelConsumption = fuelConsumption;
        }
    
        public void setColor(String color) {
            this.color = color;
        }
    
        // Display car information
        public void displayInfo() {
            System.out.println("Car Details:");
            System.out.println("Speed: " + speed + " km/h");
            System.out.println("Fuel Consumption: " + fuelConsumption + " L/100km");
            System.out.println("Color: " + color);
        }   
}

