public class Kutya {
    private String nev;
    private int kor;

    // Konstruktor
    public Kutya(String nev, int kor) {
        this.nev = nev;
        this.kor = kor;
    }

    public void ugat() {
        System.err.println(nev +"("+kor+") ugat!");
    }
}