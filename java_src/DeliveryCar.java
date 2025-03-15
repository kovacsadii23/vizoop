package java_src;
public class DeliveryCar extends Cars {
    private int cargoCapacity; 
    private int currentLoad; 

    public DeliveryCar(int speed, int fuelConsumption, String color, int cargoCapacity) {
        super(speed, fuelConsumption, color);
        this.cargoCapacity = cargoCapacity;
        this.currentLoad = 0; 
    }

    public void loadCargo(int weight) {
        if (currentLoad + weight <= cargoCapacity) {
            currentLoad += weight;
            System.out.println(weight + " kg loaded. Current load: " + currentLoad + " kg.");
        } else {
            System.out.println("Cannot load " + weight + " kg. Exceeds cargo capacity.");
        }
    }

    public void unloadCargo(int weight) {
        if (weight <= currentLoad) {
            currentLoad -= weight;
            System.out.println(weight + " kg unloaded. Current load: " + currentLoad + " kg.");
        } else {
            System.out.println("Cannot unload " + weight + " kg. Current load is only " + currentLoad + " kg.");
        }
    }

    public int getCargoCapacity() {
        return cargoCapacity;
    }

    public int getCurrentLoad() {
        return currentLoad;
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Cargo Capacity: " + cargoCapacity + " kg");
        System.out.println("Current Load: " + currentLoad + " kg");
    }
}