export const SNIPPETS = [
  /* ---------- JAVASCRIPT (EASY) ---------- */
  { id:'js-var-1', lang:'js', topic:'Variables', text:
`// Basic variables
let tea = "Masala";
const cups = 2;
var isHot = true;`},

  { id:'js-if-1', lang:'js', topic:'Conditionals', text:
`// If-else practice
let score = 42;
if(score > 50){
  console.log("Great!");
}else{
  console.log("Keep practicing!");
}`},

  /* ---------- JAVASCRIPT (MEDIUM) ---------- */
  { id:'js-loop-1', lang:'js', topic:'Loops', text:
`// For loop printing array
const arr = [1, 2, 3, 4];
for(let i = 0; i < arr.length; i++){
  console.log(arr[i]);
}`},

  { id:'js-func-1', lang:'js', topic:'Functions', text:
`// Simple function
function greet(name){
  return "Hello " + name + "!";
}
console.log(greet("Shivam"));`},

  { id:'js-obj-1', lang:'js', topic:'Objects', text:
`// Object creation
const user = {
  name: "Aarav",
  age: 21,
  isCoder: true
};
console.log(user.name);`},

  /* ---------- JAVASCRIPT (HARD) ---------- */
  { id:'js-hard-1', lang:'js', topic:'Async Weather App Logic', text:
`// Mini async program: fetch + render weather data
async function getWeather(city) {
  const apiKey = "demo-key";
  const url = \`https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.20&hourly=temperature_2m\`;
  
  try {
    const response = await fetch(url);
    if(!response.ok) throw new Error("Network error");
    const data = await response.json();

    const temps = data.hourly.temperature_2m.slice(0, 5);
    console.log(\`Weather in \${city} (next 5 hrs):\`);
    temps.forEach((t, i) => console.log(\`Hour \${i+1}: \${t}°C\`));
  } catch (err) {
    console.error("Error fetching weather:", err.message);
  } finally {
    console.log("Done fetching weather data.");
  }
}

getWeather("Delhi");`},

  { id:'js-hard-2', lang:'js', topic:'Game Logic (Typing Score)', text:
`// Simulated typing score calculator
function calculateStats(input, reference) {
  let correct = 0;
  let errors = 0;
  for(let i = 0; i < input.length; i++) {
    if(input[i] === reference[i]) correct++;
    else errors++;
  }
  const accuracy = ((correct / reference.length) * 100).toFixed(2);
  const wpm = Math.round((correct / 5) / (60 / 45)); // assume 45 sec
  console.log(\`WPM: \${wpm}, Accuracy: \${accuracy}%, Errors: \${errors}\`);
}

const userInput = "let chai = 'Masala';";
const expected = "let chai = 'Masala';";
calculateStats(userInput, expected);`}
,


  /* ---------- PYTHON (EASY) ---------- */
  { id:'py-var-1', lang:'py', topic:'Variables', text:
`# Variables
name = "Aarav"
age = 21
is_coder = True`},

  { id:'py-if-1', lang:'py', topic:'If Statements', text:
`# If-else example
score = 45
if score > 50:
    print("Great!")
else:
    print("Keep practicing!")`},

  /* ---------- PYTHON (MEDIUM) ---------- */
  { id:'py-loop-1', lang:'py', topic:'Loops', text:
`# For loop
for i in range(5):
    print(i)`},

  { id:'py-func-1', lang:'py', topic:'Functions', text:
`# Simple function
def greet(name):
    return "Hello " + name

print(greet("Shivam"))`},

  { id:'py-list-1', lang:'py', topic:'Lists', text:
`# List and comprehension
nums = [1, 2, 3, 4]
doubled = [n * 2 for n in nums]
print(doubled)`},

  /* ---------- PYTHON (HARD) ---------- */
  { id:'py-hard-1', lang:'py', topic:'Mini Banking System', text:
`# Simple class-based banking system
class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(f"Added {amount}. New balance: {self.balance}")

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            print(f"Withdrew {amount}. Remaining: {self.balance}")
        else:
            print("Insufficient funds!")

    def __str__(self):
        return f"Account({self.owner}, Balance: {self.balance})"

acc = Account("Shivam", 1000)
acc.deposit(400)
acc.withdraw(200)
acc.withdraw(1500)
print(acc)`},

  { id:'py-hard-2', lang:'py', topic:'File and Word Counter', text:
`# Word counter using file I/O
def count_words(file_path):
    try:
        with open(file_path, 'r') as f:
            text = f.read()
            words = text.split()
            count = len(words)
            print(f"Word count: {count}")
    except FileNotFoundError:
        print("File not found.")

if __name__ == "__main__":
    sample_text = "This is a typing challenge example file."
    with open("sample.txt", "w") as f:
        f.write(sample_text)
    count_words("sample.txt")`},


  /* ---------- JAVA (EASY) ---------- */
  { id:'java-var-1', lang:'java', topic:'Variables', text:
`// Variables in Java
public class Main {
  public static void main(String[] args) {
    String tea = "Masala";
    int cups = 2;
    boolean isHot = true;
    System.out.println(tea);
  }
}`},

  { id:'java-if-1', lang:'java', topic:'If Statements', text:
`// If statement
int score = 45;
if(score > 50){
  System.out.println("Great!");
}else{
  System.out.println("Keep practicing!");
}`},

  /* ---------- JAVA (MEDIUM) ---------- */
  { id:'java-loop-1', lang:'java', topic:'Loops', text:
`// For loop
for(int i = 0; i < 5; i++){
  System.out.println(i);
}`},

  { id:'java-method-1', lang:'java', topic:'Methods', text:
`// Simple method
public static void greet(String name){
  System.out.println("Hello " + name);
}
greet("Shivam");`},

  { id:'java-array-1', lang:'java', topic:'Arrays', text:
`// Array example
int[] arr = {1, 2, 3};
System.out.println(arr[0]);`},

  /* ---------- JAVA (HARD) ---------- */
  { id:'java-hard-1', lang:'java', topic:'Library Management System', text:
`// Library management simulation
import java.util.*;

class Book {
  String title;
  boolean issued;

  Book(String title){
    this.title = title;
    this.issued = false;
  }
}

public class Library {
  static List<Book> books = new ArrayList<>();

  public static void main(String[] args){
    books.add(new Book("Java 101"));
    books.add(new Book("Clean Code"));
    books.add(new Book("Design Patterns"));

    issueBook("Clean Code");
    returnBook("Clean Code");
    showBooks();
  }

  static void issueBook(String name){
    for(Book b : books){
      if(b.title.equals(name) && !b.issued){
        b.issued = true;
        System.out.println(name + " issued.");
        return;
      }
    }
    System.out.println("Book not available.");
  }

  static void returnBook(String name){
    for(Book b : books){
      if(b.title.equals(name) && b.issued){
        b.issued = false;
        System.out.println(name + " returned.");
        return;
      }
    }
    System.out.println("Book not found.");
  }

  static void showBooks(){
    System.out.println("Library contains:");
    for(Book b : books){
      System.out.println("- " + b.title + (b.issued ? " (issued)" : ""));
    }
  }
}`},

  { id:'java-hard-2', lang:'java', topic:'Multi-thread Counter', text:
`// Simple multithreading counter
class Counter extends Thread {
  private int start;
  private int end;
  Counter(int s, int e){ start = s; end = e; }
  public void run(){
    for(int i = start; i <= end; i++){
      System.out.println(getName() + " -> " + i);
      try{ Thread.sleep(200); }catch(Exception e){}
    }
  }
}

public class Main {
  public static void main(String[] args){
    Counter c1 = new Counter(1,5);
    Counter c2 = new Counter(6,10);
    c1.start();
    c2.start();
  }
}`}
];
