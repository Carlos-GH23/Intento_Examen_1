package utez.edu.mx.server.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cal")
@CrossOrigin(origins = "*")
public class CalController {

    @GetMapping("/suma")
    public int suma(int a, int b) {
        return a + b;
    }

    @GetMapping("/resta")
    public int resta(int a, int b) {
        return a - b;
    }

    @GetMapping("/multiplicacion")
    public int multiplicacion(int a, int b) {
        return a * b;
    }

    @GetMapping("/division")
    public double division(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException("Division by zero is not allowed.");
        }
        return (double) a / b;
    }
}
