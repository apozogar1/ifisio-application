package com.wellandsword.ifisio;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.wellandsword.ifisio");

        noClasses()
            .that()
            .resideInAnyPackage("com.wellandsword.ifisio.service..")
            .or()
            .resideInAnyPackage("com.wellandsword.ifisio.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..com.wellandsword.ifisio.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
