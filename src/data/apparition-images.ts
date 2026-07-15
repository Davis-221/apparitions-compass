// Image map for apparition artwork. Reverent devotional illustrations
// generated for this app — historical apparitions predate photography or
// were visions, so no original photographs exist for most of them.
import guadalupe from "@/assets/apparitions/guadalupe.jpg";
import laus from "@/assets/apparitions/laus.jpg";
import rueDuBac from "@/assets/apparitions/rue-du-bac.jpg";
import laSalette from "@/assets/apparitions/la-salette.jpg";
import lourdes from "@/assets/apparitions/lourdes.jpg";
import filippsdorf from "@/assets/apparitions/filippsdorf.jpg";
import pontmain from "@/assets/apparitions/pontmain.jpg";
import gietrzwald from "@/assets/apparitions/gietrzwald.jpg";
import knock from "@/assets/apparitions/knock.jpg";
import fatima from "@/assets/apparitions/fatima.jpg";
import beauraing from "@/assets/apparitions/beauraing.jpg";
import banneux from "@/assets/apparitions/banneux.jpg";
import amsterdam from "@/assets/apparitions/amsterdam.jpg";
import lIleBouchard from "@/assets/apparitions/l-ile-bouchard.jpg";
import syracuse from "@/assets/apparitions/syracuse.jpg";
import zeitoun from "@/assets/apparitions/zeitoun.jpg";
import akita from "@/assets/apparitions/akita.jpg";
import betania from "@/assets/apparitions/betania.jpg";
import kibeho from "@/assets/apparitions/kibeho.jpg";
import sanNicolas from "@/assets/apparitions/san-nicolas.jpg";
import cuapa from "@/assets/apparitions/cuapa.jpg";
import medjugorje from "@/assets/apparitions/medjugorje.jpg";
import garabandal from "@/assets/apparitions/garabandal.jpg";
import naju from "@/assets/apparitions/naju.jpg";
import anguera from "@/assets/apparitions/anguera.jpg";
import litmanova from "@/assets/apparitions/litmanova.jpg";
import bayside from "@/assets/apparitions/bayside.jpg";
import necedah from "@/assets/apparitions/necedah.jpg";

export const APPARITION_IMAGES: Record<string, string> = {
  guadalupe,
  laus,
  "rue-du-bac": rueDuBac,
  "la-salette": laSalette,
  lourdes,
  filippsdorf,
  pontmain,
  gietrzwald,
  knock,
  fatima,
  beauraing,
  banneux,
  amsterdam,
  "l-ile-bouchard": lIleBouchard,
  syracuse,
  zeitoun,
  akita,
  betania,
  kibeho,
  "san-nicolas": sanNicolas,
  cuapa,
  medjugorje,
  garabandal,
  naju,
  anguera,
  litmanova,
  bayside,
  necedah,
};

export function apparitionImage(slug: string): string | undefined {
  return APPARITION_IMAGES[slug];
}
