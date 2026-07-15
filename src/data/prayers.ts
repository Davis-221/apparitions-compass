export interface Prayer {
  slug: string;
  title: string;
  category: "marian" | "rosary" | "apparition";
  apparitionSlug?: string;
  text: string;
}

export const PRAYERS: Prayer[] = [
  {
    slug: "hail-mary",
    title: "Hail Mary",
    category: "marian",
    text: "Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus.\n\nHoly Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
  },
  {
    slug: "memorare",
    title: "Memorare",
    category: "marian",
    text: "Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to thy protection, implored thy help, or sought thy intercession was left unaided.\n\nInspired with this confidence, I fly to thee, O Virgin of virgins, my Mother; to thee do I come; before thee I stand, sinful and sorrowful. O Mother of the Word Incarnate, despise not my petitions, but in thy mercy hear and answer me. Amen.",
  },
  {
    slug: "angelus",
    title: "The Angelus",
    category: "marian",
    text: "V. The Angel of the Lord declared unto Mary,\nR. And she conceived of the Holy Spirit.\n\nHail Mary…\n\nV. Behold the handmaid of the Lord,\nR. Be it done unto me according to thy word.\n\nHail Mary…\n\nV. And the Word was made flesh,\nR. And dwelt among us.\n\nHail Mary…\n\nV. Pray for us, O holy Mother of God,\nR. That we may be made worthy of the promises of Christ.\n\nLet us pray: Pour forth, we beseech Thee, O Lord, Thy grace into our hearts, that we to whom the Incarnation of Christ Thy Son was made known by the message of an angel, may by His Passion and Cross be brought to the glory of His Resurrection. Through the same Christ Our Lord. Amen.",
  },
  {
    slug: "salve-regina",
    title: "Salve Regina (Hail, Holy Queen)",
    category: "marian",
    text: "Hail, Holy Queen, Mother of Mercy, our life, our sweetness and our hope.\n\nTo thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears.\n\nTurn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus.\n\nO clement, O loving, O sweet Virgin Mary.\n\nV. Pray for us, O holy Mother of God.\nR. That we may be made worthy of the promises of Christ. Amen.",
  },
  {
    slug: "rosary-joyful",
    title: "Joyful Mysteries",
    category: "rosary",
    text: "1. The Annunciation — The angel Gabriel announces to Mary that she will conceive the Son of God.\n\n2. The Visitation — Mary visits her cousin Elizabeth, who is pregnant with John the Baptist.\n\n3. The Nativity — Jesus is born in Bethlehem.\n\n4. The Presentation — Mary and Joseph present the infant Jesus in the Temple.\n\n5. The Finding in the Temple — The boy Jesus is found teaching the elders in the Temple.",
  },
  {
    slug: "rosary-sorrowful",
    title: "Sorrowful Mysteries",
    category: "rosary",
    text: "1. The Agony in the Garden — Jesus prays in Gethsemane, sweating blood.\n\n2. The Scourging at the Pillar — Jesus is bound and scourged.\n\n3. The Crowning with Thorns — Soldiers press a crown of thorns upon His head.\n\n4. The Carrying of the Cross — Jesus carries His Cross to Calvary.\n\n5. The Crucifixion — Jesus is nailed to the Cross and dies for our sins.",
  },
  {
    slug: "rosary-glorious",
    title: "Glorious Mysteries",
    category: "rosary",
    text: "1. The Resurrection — Jesus rises from the dead on the third day.\n\n2. The Ascension — Jesus ascends into Heaven forty days after the Resurrection.\n\n3. The Descent of the Holy Spirit — The Holy Spirit descends upon the Apostles at Pentecost.\n\n4. The Assumption — Mary is taken body and soul into Heaven.\n\n5. The Coronation — Mary is crowned Queen of Heaven and Earth.",
  },
  {
    slug: "rosary-luminous",
    title: "Luminous Mysteries",
    category: "rosary",
    text: "1. The Baptism of Jesus — Jesus is baptized in the Jordan by John.\n\n2. The Wedding at Cana — Jesus works His first miracle at Mary's request.\n\n3. The Proclamation of the Kingdom — Jesus calls all to conversion and proclaims the Kingdom.\n\n4. The Transfiguration — Jesus is transfigured in glory on Mount Tabor.\n\n5. The Institution of the Eucharist — Jesus gives us His Body and Blood at the Last Supper.",
  },
  {
    slug: "fatima-prayer",
    title: "Fatima Prayer",
    category: "apparition",
    apparitionSlug: "fatima",
    text: "O my Jesus, forgive us our sins, save us from the fires of hell. Lead all souls to Heaven, especially those in most need of Thy mercy. Amen.",
  },
  {
    slug: "guadalupe-prayer",
    title: "Prayer to Our Lady of Guadalupe",
    category: "apparition",
    apparitionSlug: "guadalupe",
    text: "Our Lady of Guadalupe, Mystical Rose, make intercession for the Holy Church, protect the Sovereign Pontiff, help all those who invoke thee in their necessities, and since thou art the ever Virgin Mary and Mother of the true God, obtain for us from thy most holy Son the grace of keeping our faith, sweet hope in the midst of the bitterness of life, burning charity, and the precious gift of final perseverance. Amen.",
  },
  {
    slug: "lourdes-prayer",
    title: "Prayer to Our Lady of Lourdes",
    category: "apparition",
    apparitionSlug: "lourdes",
    text: "O ever Immaculate Virgin, Mother of Mercy, Health of the Sick, Refuge of Sinners, Comforter of the Afflicted, you know my wants, my troubles, my sufferings; look with mercy on me.\n\nBy appearing in the Grotto of Lourdes, you were pleased to make it a privileged sanctuary whence you dispense your favors; and already many sufferers have obtained the cure of their infirmities, both spiritual and corporal.\n\nI come, therefore, with confidence to implore your maternal intercession. Obtain, O loving Mother, the granting of my requests. Through gratitude for your favors, I will endeavor to imitate your virtues, that I may one day share your glory. Amen.",
  },
  {
    slug: "miraculous-medal-prayer",
    title: "Prayer of the Miraculous Medal",
    category: "apparition",
    apparitionSlug: "rue-du-bac",
    text: "O Mary conceived without sin, pray for us who have recourse to thee.\n\nO Mary conceived without sin, pray for us who have recourse to thee.\n\nO Mary conceived without sin, pray for us who have recourse to thee.",
  },
];

export function getPrayer(slug: string): Prayer | undefined {
  return PRAYERS.find((p) => p.slug === slug);
}
