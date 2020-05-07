package com.wellandsword.ifisio.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.wellandsword.ifisio.web.rest.TestUtil;

public class MedicionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Medicion.class);
        Medicion medicion1 = new Medicion();
        medicion1.setId(1L);
        Medicion medicion2 = new Medicion();
        medicion2.setId(medicion1.getId());
        assertThat(medicion1).isEqualTo(medicion2);
        medicion2.setId(2L);
        assertThat(medicion1).isNotEqualTo(medicion2);
        medicion1.setId(null);
        assertThat(medicion1).isNotEqualTo(medicion2);
    }
}
