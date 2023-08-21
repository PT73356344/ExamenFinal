package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Producto;
import com.example.demo.entity.Vendedor;
import com.example.demo.entity.Venta;
import com.example.demo.entity.VentaDetalle;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.repository.VendedorRepository;
import com.example.demo.repository.VentaDetalleRepository;
import com.example.demo.repository.VentaRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final ProductoRepository productoRepository;
    private final VendedorRepository vendedorRepository;
    private final VentaRepository ventaRepository;
    private final VentaDetalleRepository ventaDetalleRepository;

	@Autowired
	public DatabaseLoader(
			ProductoRepository productoRepository,
            VendedorRepository vendedorRepository,
            VentaRepository ventaRepository,
            VentaDetalleRepository ventaDetalleRepository) {
		this.productoRepository = productoRepository;
        this.vendedorRepository = vendedorRepository;
        this.ventaRepository = ventaRepository;
        this.ventaDetalleRepository = ventaDetalleRepository;
	}

	@Override
	public void run(String... strings) throws Exception {
		
		Producto producto1 = new Producto("Perfume", 10.0);
        Producto producto2 = new Producto("Shampoo", 20.0);
        Producto producto3 = new Producto("Jabón", 30.0);

        this.productoRepository.save(producto1);
        this.productoRepository.save(producto2);
        this.productoRepository.save(producto3);

        Vendedor vendedor1 = new Vendedor("Joel Capristan Lara");
        Vendedor vendedor2 = new Vendedor("Aaron Hurado Cardenas");

        this.vendedorRepository.save(vendedor1);
        this.vendedorRepository.save(vendedor2);

        Venta venta1 = new Venta(1, vendedor1, 60.0, 10.0, 50.0);
        Venta venta2 = new Venta(2, vendedor2, 80.0, 14.4, 25.4);

        this.ventaRepository.save(venta1);
        this.ventaRepository.save(venta2);

        VentaDetalle detalle1 = new VentaDetalle(venta1, producto1, 1, 10.0);
        VentaDetalle detalle2 = new VentaDetalle(venta1, producto2, 4, 65.0);
        VentaDetalle detalle3 = new VentaDetalle(venta2, producto3, 1,15.0);

        this.ventaDetalleRepository.save(detalle1);
        this.ventaDetalleRepository.save(detalle2);
        this.ventaDetalleRepository.save(detalle3);
	}

	
}