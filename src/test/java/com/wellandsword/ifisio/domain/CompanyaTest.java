package com.wellandsword.ifisio.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.wellandsword.ifisio.web.rest.TestUtil;

public class CompanyaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Companya.class);
        Companya companya1 = new Companya();
        companya1.setId(1L);
        Companya companya2 = new Companya();
        companya2.setId(companya1.getId());
        assertThat(companya1).isEqualTo(companya2);
        companya2.setId(2L);
        assertThat(companya1).isNotEqualTo(companya2);
        companya1.setId(null);
        assertThat(companya1).isNotEqualTo(companya2);
    }
}
