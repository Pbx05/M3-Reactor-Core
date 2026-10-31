## 🤖 Uso de IA

He utilizado la IA en este trabajo sobre todo para:
* Planificar y verificar la descomposición de componentes en React.
* Evitar errores en la extracción y normalización de los datos de la API Jolpi Ergast.
* Verificar que estaba haciendo bien la migracion a react

### Prompts principales

* **Migración a React Core**
  > *Cual seria la forma mas adecuada de migrar mi aplicacion web a react?*

### Validación del código

He tratado de evitar que me diera el código ya aplicado para comprender bien cada paso.

Para verificar lo generado, siempre leía la explicación, comprendía el motivo de la solución y continuaba con ella solo si me parecía correcta; si no, la corregía a mano por código propio de mejor calidad y comprension de lo que estaba haciendo.

---

## 🔍 Autopsia
Una de las decisiones tomadas ha sido usar la función de inicialización perezosa de useState, esto asegura que la lectura síncrona a disco solo se ejecute una vez en el montaje inicial, y no en cada re-render del componente. Leer localStorage dentro de un useEffect tras el montaje, lo que habría provocado un render inicial con valores por defecto y un segundo render (con parpadeo visual) al cargar la preferencia guardada.