package com.wellandsword.ifisio.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.wellandsword.ifisio.web.rest.TestUtil;

public class CitaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cita.class);
        Cita cita1 = new Cita();
        cita1.setId(1L);
        Cita cita2 = new Cita();
        cita2.setId(cita1.getId());
        assertThat(cita1).isEqualTo(cita2);
        cita2.setId(2L);
        assertThat(cita1).isNotEqualTo(cita2);
        cita1.setId(null);
        assertThat(cita1).isNotEqualTo(cita2);
    }
}
