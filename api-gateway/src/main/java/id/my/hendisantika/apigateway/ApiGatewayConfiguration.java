package id.my.hendisantika.apigateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;

/**
 * Created by IntelliJ IDEA.
 * Project : spring-boot-react-sample
 * User: hendisantika
 * Email: hendisantika@gmail.com
 * Telegram : @hendisantika34
 * Date: 5/22/24
 * Time: 06:37
 * To change this template use File | Settings | File Templates.
 */
@Configuration
public class ApiGatewayConfiguration {

    /**
     * Downstream services also send CORS headers (@CrossOrigin), so keep only one copy.
     */
    private static final String DEDUPE_CORS_HEADERS =
            "Access-Control-Allow-Origin Access-Control-Allow-Credentials";

    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("product_service", r -> r.path("/products/**")
                        .filters(f -> f.dedupeResponseHeader(DEDUPE_CORS_HEADERS, "RETAIN_FIRST"))
                        .uri("lb://product-service"))
                .route("order_service", r -> r.path("/orders/**")
                        .filters(f -> f.dedupeResponseHeader(DEDUPE_CORS_HEADERS, "RETAIN_FIRST"))
                        .uri("lb://order-service"))
                .build();
    }

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*"); // You can specify the allowed origins here
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
        corsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);

        return new CorsWebFilter(corsConfigurationSource);
    }
}
