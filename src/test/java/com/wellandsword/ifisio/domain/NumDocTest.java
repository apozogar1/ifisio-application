package com.wellandsword.ifisio.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.wellandsword.ifisio.web.rest.TestUtil;

public class NumDocTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NumDoc.class);
        NumDoc numDoc1 = new NumDoc();
        numDoc1.setId(1L);
        NumDoc numDoc2 = new NumDoc();
        numDoc2.setId(numDoc1.getId());
        assertThat(numDoc1).isEqualTo(numDoc2);
        numDoc2.setId(2L);
        assertThat(numDoc1).isNotEqualTo(numDoc2);
        numDoc1.setId(null);
        assertThat(numDoc1).isNotEqualTo(numDoc2);
    }
}
