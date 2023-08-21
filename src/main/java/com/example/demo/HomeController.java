package com.example.demo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.entity.Venta;
import com.example.demo.entity.VentaDetalle;
import com.example.demo.repository.VentaDetalleRepository;
import com.example.demo.repository.VentaRepository;

import jakarta.transaction.Transactional;

@Controller
public class HomeController {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
    private VentaRepository ventaRepository;
    
    @Autowired
    private VentaDetalleRepository ventaDetalleRepository;

	@RequestMapping(value = "/")
	public String index() {
		return "index";
	}

	@GetMapping(path="/api/bandas/{id}/formacion")
	public @ResponseBody List<Map<String, Object>> formacion(@PathVariable Integer id){
		String sql = "SELECT integrante.id as ID, musico.nombre as MUSICO, instrumento.nombre as INSTRUMENTO FROM integrante JOIN musico ON integrante.id_musico = musico.id JOIN instrumento ON integrante.id_instrumento = instrumento.id WHERE id_banda = ?";
		List<Map<String, Object>> queryResult = jdbcTemplate.queryForList(sql, id);
		return queryResult;
	}

	@GetMapping("/api/ventas/{id}/ventaDetalle")
    public @ResponseBody List<Map<String, Object>> ventaDetalle(@PathVariable Integer id) {
        String sql = "SELECT vd.id as ID, p.nombre as PRODUCTO, p.precio as PRECIO, vd.cantidad as CANTIDAD, (vd.cantidad * p.precio) as IMPORTE FROM venta_detalle vd JOIN producto p ON vd.id_producto = p.id WHERE id_venta = ?";
        List<Map<String, Object>> queryResult = jdbcTemplate.queryForList(sql, id);
        return queryResult;
    }

	@GetMapping("/api/ventas/{id}/ventadatos")
    @Transactional
    public ResponseEntity<Map<String, Object>> calcularYActualizarVentaDatos(@PathVariable Long id) {
        Venta venta = ventaRepository.findById(id).orElse(null);
        if (venta == null) {
            return ResponseEntity.notFound().build();
        }

        double importe = 0.0;
        List<VentaDetalle> ventaDetalles = ventaDetalleRepository.findByVenta(venta);
        for (VentaDetalle ventaDetalle : ventaDetalles) {
            importe += ventaDetalle.getCantidad() * ventaDetalle.getProducto().getPrecio();
        }
        double igv = Math.round(importe * 0.18 * 100.0) / 100.0;
        double total = importe + igv;

        venta.setImporte(importe);
        venta.setIgv(igv);
        venta.setTotal(total);
        ventaRepository.save(venta);

        Map<String, Object> response = new HashMap<>();
        response.put("ID", venta.getId());
        response.put("IMPORTE", importe);
        response.put("IGV", igv);
        response.put("TOTAL", total);

        return ResponseEntity.ok(response);
    }

}