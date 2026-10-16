"""Comprime las fotos para que la página cargue rápido en el celular.

Cómo se usa:
  1. Pon las fotos originales (las del teléfono) en la carpeta  img-originales/
  2. Ejecuta:  python herramientas/comprimir_imagenes.py
  3. Las fotos listas aparecen en  img/  con el mismo nombre.

Las originales nunca se tocan: siempre se comprime a partir de ellas.
"""
from pathlib import Path
from PIL import Image, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
ORIGINALES = RAIZ / "img-originales"
SALIDA = RAIZ / "img"

LADO_MAXIMO = 1000   # píxeles del lado más largo (suficiente para pantallas de celular)
CALIDAD = 72         # 1-100: más bajo pesa menos, pero se ve peor
FORMATOS = {".jpg", ".jpeg", ".png"}


def comprimir(origen: Path) -> None:
    destino = SALIDA / origen.name

    with Image.open(origen) as foto:
        foto = ImageOps.exif_transpose(foto)   # respeta la orientación del teléfono
        foto = foto.convert("RGB")             # JPG no admite transparencia
        foto.thumbnail((LADO_MAXIMO, LADO_MAXIMO))   # reduce sin deformar
        foto.save(destino, format="JPEG", quality=CALIDAD, optimize=True, progressive=True)

    antes = origen.stat().st_size / 1024
    despues = destino.stat().st_size / 1024
    print(f"{origen.name}: {antes:.0f} KB -> {despues:.0f} KB")


def main() -> None:
    SALIDA.mkdir(exist_ok=True)
    fotos = sorted(f for f in ORIGINALES.iterdir() if f.suffix.lower() in FORMATOS)

    if not fotos:
        print("No hay fotos en img-originales/")
        return

    for foto in fotos:
        comprimir(foto)
    print(f"Listo: {len(fotos)} fotos comprimidas en img/")


if __name__ == "__main__":
    main()
