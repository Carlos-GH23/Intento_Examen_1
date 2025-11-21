import { useState } from "react";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      setError("Por favor ingrese números válidos");
      setLoading(false);
      return;
    }

    try {
      let endpoint = "";
      switch (operation) {
        case "add":
          endpoint = "/api/cal/suma";
          break;
        case "subtract":
          endpoint = "/api/cal/resta";
          break;
        case "multiply":
          endpoint = "/api/cal/multiplicacion";
          break;
        case "divide":
          endpoint = "/api/cal/division";
          break;
        default:
          endpoint = "/api/cal/suma";
      }

      const response = await fetch(
        `http://localhost:8082${endpoint}?a=${a}&b=${b}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-primary">Calculadora - Prueba Examen</h1>
      <form className="p-4 border rounded" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="num1" className="form-label">
            Número 1
          </label>
          <input
            type="number"
            className="form-control"
            id="num1"
            placeholder="Ingrese el primer número"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="num2" className="form-label">
            Número 2
          </label>
          <input
            type="number"
            className="form-control"
            id="num2"
            placeholder="Ingrese el segundo número"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="operation" className="form-label">
            Operación
          </label>
          <select
            className="form-select"
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="add">Sumar</option>
            <option value="subtract">Restar</option>
            <option value="multiply">Multiplicar</option>
            <option value="divide">Dividir</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Calculando..." : "Calcular"}
        </button>
      </form>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      {result !== null && (
        <div className="alert alert-success mt-3" role="alert">
          <strong>Resultado:</strong> {result}
        </div>
      )}
    </>
  );
}

export default App;
