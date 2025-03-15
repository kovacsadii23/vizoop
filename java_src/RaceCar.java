package java_src;
public class RaceCar extends Cars {
    private double aerodynamics; 
    private boolean boostEnabled;

    // Constructor
    public RaceCar(int speed, int fuelConsumption, String color, double aerodynamics, boolean boostEnabled) {
        super(speed, fuelConsumption, color);
        this.aerodynamics = aerodynamics;
        this.boostEnabled = boostEnabled;
    }

    public void enableBoost() {
        if (boostEnabled) {
            int boostAmount = 50;
            setSpeed(getSpeed() + boostAmount);
            System.out.println("Boost mode activated! Speed increased by " + boostAmount + " km/h.");
        } else {
            System.out.println("This race car does not have a boost feature.");
        }
    }

    public void optimizePerformance() {
        System.out.println("Optimizing performance with aerodynamics coefficient of " + aerodynamics + ".");
        if (aerodynamics > 1.5) {
            System.out.println("High aerodynamics, top speed increased.");
            setSpeed(getSpeed() + 10);
        } else {
            System.out.println("Standard aerodynamics, no change in speed.");
        }
    }

    public double getAerodynamics() {
        return aerodynamics;
    }

    public void setAerodynamics(double aerodynamics) {
        this.aerodynamics = aerodynamics;
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Aerodynamics: " + aerodynamics);
        System.out.println("Boost Enabled: " + (boostEnabled ? "Yes" : "No"));
    }
}