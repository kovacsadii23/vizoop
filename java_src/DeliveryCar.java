package java_src;
public class DeliveryCar extends Cars {
    // Unique attributes for DeliveryCar
    private int cargoCapacity; // Maximum capacity in kg
    private int currentLoad; // Current load in kg

    // Constructor
    public DeliveryCar(int speed, int fuelConsumption, String color, int cargoCapacity) {
        super(speed, fuelConsumption, color);
        this.cargoCapacity = cargoCapacity;
        this.currentLoad = 0; // Default to an empty load
    }

    // Method to load cargo
    public void loadCargo(int weight) {
        if (currentLoad + weight <= cargoCapacity) {
            currentLoad += weight;
            System.out.println(weight + " kg loaded. Current load: " + currentLoad + " kg.");
        } else {
            System.out.println("Cannot load " + weight + " kg. Exceeds cargo capacity.");
        }
    }

    // Method to unload cargo
    public void unloadCargo(int weight) {
        if (weight <= currentLoad) {
            currentLoad -= weight;
            System.out.println(weight + " kg unloaded. Current load: " + currentLoad + " kg.");
        } else {
            System.out.println("Cannot unload " + weight + " kg. Current load is only " + currentLoad + " kg.");
        }
    }

    // Getter for cargo capacity
    public int getCargoCapacity() {
        return cargoCapacity;
    }

    // Getter for current load
    public int getCurrentLoad() {
        return currentLoad;
    }

    // Override the displayInfo method to include DeliveryCar-specific details
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Cargo Capacity: " + cargoCapacity + " kg");
        System.out.println("Current Load: " + currentLoad + " kg");
    }
}