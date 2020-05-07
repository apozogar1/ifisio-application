package com.wellandsword.ifisio.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.wellandsword.ifisio.web.rest.TestUtil;

public class TratamientoClienteTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TratamientoCliente.class);
        TratamientoCliente tratamientoCliente1 = new TratamientoCliente();
        tratamientoCliente1.setId(1L);
        TratamientoCliente tratamientoCliente2 = new TratamientoCliente();
        tratamientoCliente2.setId(tratamientoCliente1.getId());
        assertThat(tratamientoCliente1).isEqualTo(tratamientoCliente2);
        tratamientoCliente2.setId(2L);
        assertThat(tratamientoCliente1).isNotEqualTo(tratamientoCliente2);
        tratamientoCliente1.setId(null);
        assertThat(tratamientoCliente1).isNotEqualTo(tratamientoCliente2);
    }
}
