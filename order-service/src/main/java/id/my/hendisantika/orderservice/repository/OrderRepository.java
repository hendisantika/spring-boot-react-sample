package id.my.hendisantika.orderservice.repository;

import id.my.hendisantika.orderservice.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by IntelliJ IDEA.
 * Project : spring-boot-react-sample
 * User: hendisantika
 * Email: hendisantika@gmail.com
 * Telegram : @hendisantika34
 * Date: 5/22/24
 * Time: 06:33
 * To change this template use File | Settings | File Templates.
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
