package com.wellandsword.ifisio.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.wellandsword.ifisio.web.rest.TestUtil;

public class TratamientoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tratamiento.class);
        Tratamiento tratamiento1 = new Tratamiento();
        tratamiento1.setId(1L);
        Tratamiento tratamiento2 = new Tratamiento();
        tratamiento2.setId(tratamiento1.getId());
        assertThat(tratamiento1).isEqualTo(tratamiento2);
        tratamiento2.setId(2L);
        assertThat(tratamiento1).isNotEqualTo(tratamiento2);
        tratamiento1.setId(null);
        assertThat(tratamiento1).isNotEqualTo(tratamiento2);
    }
}
