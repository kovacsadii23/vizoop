package java_src;
public class OffRoad extends Cars {
    
    private int groundClearance; 
    private boolean fourWheelDrive;

    public OffRoad(int speed, int fuelConsumption, String color, int groundClearance, boolean fourWheelDrive) {
        super(speed, fuelConsumption, color);
        this.groundClearance = groundClearance;
        this.fourWheelDrive = fourWheelDrive;
    }
    public void activateFourWheelDrive() {
        if (fourWheelDrive) {
            System.out.println("Four-wheel drive activated!");
        } else {
            System.out.println("This vehicle does not support four-wheel drive.");
        }
    }

    public void adaptToTerrain(String terrainType) {
        System.out.println("Adapting to " + terrainType + " terrain...");
        if (terrainType.equalsIgnoreCase("rocky")) {
            System.out.println("Increasing ground clearance for rocky terrain.");
        } else if (terrainType.equalsIgnoreCase("muddy")) {
            System.out.println("Activating traction control for muddy terrain.");
        } else {
            System.out.println("Standard adaptation applied.");
        }
    }

    public int getGroundClearance() {
        return groundClearance;
    }

    public void setGroundClearance(int groundClearance) {
        this.groundClearance = groundClearance;
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Ground Clearance: " + groundClearance + " cm");
        System.out.println("Four-Wheel Drive: " + (fourWheelDrive ? "Yes" : "No"));
    }
}