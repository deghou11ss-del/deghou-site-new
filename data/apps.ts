export type OSKey = 'windows' | 'ios' | 'android' | 'linux' | 'macos' | 'androidtv' | 'appletv'

export type InstallLink = { label: string; url: string }

export type AppEntry = {
  name: string
  icon: string
  installs: InstallLink[]
  instructions: { title: string; text: string }[]
  address?: { label: string; value: string }[]
  connect: string
}

export const BOT_URL = 'https://t.me/deghouvpn_bot'

export const OS_OPTIONS: { value: OSKey; label: string }[] = [
  { value: 'windows', label: 'Windows' },
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'linux', label: 'Linux' },
  { value: 'macos', label: 'macOS' },
  { value: 'androidtv', label: 'Android TV' },
  { value: 'appletv', label: 'Apple TV' },
]

export const PLATFORMS = ['iOS', 'Android', 'Windows', 'macOS', 'Linux', 'Android TV', 'Apple TV']

const ICONS = {
  Happ: '/happ.png',
  Streisand: '/streisand.jpg',
  Shadowrocket: '/shadowrocket.webp',
  v2RayTun: '/v2raytun.webp',
  Hiddify: '/hiddify.jpeg',
  Throne: '/throne.jpeg',
  NekoBox: '/nekobox.webp',
  'Clash Verge Rev': '/clashverge.jpg',
  FlClashX: '/flclashx.png',
  VPN4TV: '/vpn4tv.webp',
} as const

const groupConnect = (app: string) =>
  `1. Откройте ${app}\n2. Настройки → Группы\n3. Новая группа → тип «Подписка»\n4. Вставьте ссылку в URL\n5. Обновите подписку\n6. Включите режим TUN.\n\nОбязательно перейдите в Настройки — Основные настройки — Подписка — Включить автоматическое обновление, интервал в минутах — 60.`

const profileTunConnect =
  'Выберите добавленный профиль в разделе «Профили». В панели управления нажмите кнопку включения в правом нижнем углу, а затем включите переключатель у пункта TUN. После запуска в разделе «Прокси» можно изменить сервер, к которому вас подключит.'

const powerButtonConnect =
  'В главном разделе нажмите большую кнопку включения в центре, чтобы подключиться к VPN. Не забудьте выбрать сервер в списке серверов. При необходимости выберите другой.'

const linuxInstall = {
  title: 'Установка',
  text: 'Выберите подходящую версию для вашего устройства, нажмите на кнопку ниже и установите приложение.',
}

export const APPS: Record<OSKey, AppEntry[]> = {
  windows: [
    {
      name: 'Throne',
      icon: ICONS.Throne,
      installs: [
        {
          label: 'Windows 10 / 11',
          url: 'https://github.com/throneproj/Throne/releases/download/1.1.4/Throne-1.1.4-windows-universal-installer.exe',
        },
        {
          label: 'Windows 7 — портативная',
          url: 'https://github.com/throneproj/Throne/releases/download/1.1.4/Throne-1.1.4-windows32.zip',
        },
        {
          label: 'Windows 10 / 11 — запасная',
          url: 'https://storage.yandexcloud.net/vps-apps/Throne-1.1.4-windows-universal-installer.exe',
        },
      ],
      instructions: [{ title: 'Установка', text: 'Выберите версию Windows, скачайте и установите приложение.' }],
      connect: groupConnect('Throne'),
    },
    {
      name: 'NekoBox',
      icon: ICONS.NekoBox,
      installs: [{ label: 'Скачать (GitHub)', url: 'https://github.com/MatsuriDayo/nekoray/releases' }],
      instructions: [{ title: 'Установка', text: 'Скачайте zip-архив с GitHub и распакуйте.' }],
      connect: groupConnect('NekoBox'),
    },
    {
      name: 'Clash Verge Rev',
      icon: ICONS['Clash Verge Rev'],
      installs: [
        { label: 'Windows (установщик)', url: 'https://github.com/clash-verge-rev/clash-verge-rev/releases' },
      ],
      instructions: [{ title: 'Установка', text: 'Скачайте установщик для Windows и установите.' }],
      connect: 'Профили → URL подписки → Включить TUN.',
    },
  ],
  ios: [
    {
      name: 'Happ',
      icon: ICONS.Happ,
      installs: [{ label: 'App Store (Global)', url: 'https://apps.apple.com/app/happ-proxy-utility/id6504287215' }],
      instructions: [
        {
          title: 'Смена региона App Store',
          text: 'Happ удалили из российского App Store, поэтому сначала нужно сменить регион Apple ID.\n\n1. Откройте Настройки и нажмите на своё имя вверху экрана.\n2. Перейдите в «Контент и покупки» → «Просмотреть аккаунт». Подтвердите вход через Face ID или Touch ID.\n3. Выберите «Страна/регион» → «Изменить страну или регион».\n4. Выберите из списка Казахстан (или другую страну).\n5. Примите условия использования — без этого шага двигаться дальше не получится.\n6. В строке «Способ оплаты» выберите «Нет», если карты выбранного региона нет.\n7. Укажите адрес выбранной страны — подойдут данные ниже.\n8. Нажмите «Готово».\n\nПосле перезагрузки App Store покажет контент нового региона.',
        },
      ],
      address: [
        { label: 'Street', value: 'Астана' },
        { label: 'City/Town', value: 'Астана' },
        { label: 'Region', value: 'Pavlodar' },
        { label: 'Postcode', value: '101000' },
        { label: 'Phone', value: '999 9999999' },
      ],
      connect: powerButtonConnect,
    },
    {
      name: 'Streisand',
      icon: ICONS.Streisand,
      installs: [{ label: 'App Store', url: 'https://apps.apple.com/app/streisand/id6450534064' }],
      instructions: [{ title: 'Установка', text: 'Откройте App Store и установите приложение.' }],
      connect: 'Откройте приложение, импортируйте подписку и нажмите Connect.',
    },
    {
      name: 'Shadowrocket',
      icon: ICONS.Shadowrocket,
      installs: [{ label: 'App Store', url: 'https://apps.apple.com/app/shadowrocket/id932747118' }],
      instructions: [{ title: 'Установка', text: 'Откройте App Store и установите приложение.' }],
      connect: 'Откройте приложение, добавьте подписку и включите туннель.',
    },
  ],
  android: [
    {
      name: 'Happ',
      icon: ICONS.Happ,
      installs: [
        { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.happproxy' },
        { label: 'Скачать APK', url: 'https://github.com/Happ-proxy/happ-android/releases' },
      ],
      instructions: [{ title: 'Установка', text: 'Откройте Google Play или скачайте APK по кнопке ниже.' }],
      connect: 'Откройте приложение и нажмите кнопку подключения.',
    },
    {
      name: 'FlClashX',
      icon: ICONS.FlClashX,
      installs: [
        {
          label: 'Скачать APK',
          url: 'https://github.com/pluralplay/FlClashX/releases/download/v0.2.1/FlClashX-0.2.1-android-arm64-v8a.apk',
        },
      ],
      instructions: [{ title: 'Установка', text: 'Скачайте и установите FlClashX APK.' }],
      connect:
        'Выберите добавленный профиль в разделе «Профили». В панели управления нажмите кнопку включения в правом нижнем углу. После запуска в разделе «Прокси» можно изменить сервер.',
    },
  ],
  linux: [
    {
      name: 'Throne',
      icon: ICONS.Throne,
      installs: [{ label: 'Скачать (GitHub)', url: 'https://github.com/throneproj/Throne/releases' }],
      instructions: [linuxInstall],
      connect: groupConnect('Throne'),
    },
    {
      name: 'NekoBox',
      icon: ICONS.NekoBox,
      installs: [{ label: 'Скачать (GitHub)', url: 'https://github.com/qr243vbi/nekobox/releases' }],
      instructions: [linuxInstall],
      connect: groupConnect('NekoBox'),
    },
    {
      name: 'Clash Verge Rev',
      icon: ICONS['Clash Verge Rev'],
      installs: [{ label: 'Скачать (GitHub)', url: 'https://github.com/clash-verge-rev/clash-verge-rev/releases' }],
      instructions: [linuxInstall],
      connect: profileTunConnect,
    },
    {
      name: 'FlClashX',
      icon: ICONS.FlClashX,
      installs: [
        {
          label: 'amd64 (.deb)',
          url: 'https://github.com/pluralplay/FlClashX/releases/download/v0.2.1/FlClashX-0.2.1-linux-amd64.deb',
        },
        {
          label: 'amd64 (AppImage)',
          url: 'https://github.com/pluralplay/FlClashX/releases/download/v0.2.1/FlClashX-0.2.1-linux-amd64.AppImage',
        },
        {
          label: 'amd64 (.rpm)',
          url: 'https://github.com/pluralplay/FlClashX/releases/download/v0.2.1/FlClashX-0.2.1-linux-amd64.rpm',
        },
        {
          label: 'arm64 (.deb)',
          url: 'https://github.com/pluralplay/FlClashX/releases/download/v0.2.1/FlClashX-0.2.1-linux-arm64.deb',
        },
      ],
      instructions: [linuxInstall],
      connect: profileTunConnect,
    },
    {
      name: 'Hiddify',
      icon: ICONS.Hiddify,
      installs: [
        {
          label: 'AppImage',
          url: 'https://github.com/hiddify/hiddify-app/releases/download/v2.5.7/Hiddify-Linux-x64.AppImage',
        },
      ],
      instructions: [{ title: 'Установка', text: 'Скачайте AppImage и сделайте его исполняемым.' }],
      connect: profileTunConnect,
    },
  ],
  macos: [
    {
      name: 'Happ',
      icon: ICONS.Happ,
      installs: [{ label: 'App Store', url: 'https://apps.apple.com/app/happ-proxy-utility/id6504287215' }],
      instructions: [{ title: 'Установка', text: 'Откройте страницу в App Store и установите приложение.' }],
      connect: powerButtonConnect,
    },
    {
      name: 'Clash Verge Rev',
      icon: ICONS['Clash Verge Rev'],
      installs: [{ label: 'Скачать (GitHub)', url: 'https://github.com/clash-verge-rev/clash-verge-rev/releases' }],
      instructions: [linuxInstall],
      connect: profileTunConnect,
    },
    {
      name: 'Hiddify',
      icon: ICONS.Hiddify,
      installs: [
        {
          label: 'Скачать (dmg)',
          url: 'https://github.com/hiddify/hiddify-app/releases/download/v2.5.7/Hiddify-MacOS.dmg',
        },
      ],
      instructions: [{ title: 'Установка', text: 'Скачайте и установите Hiddify.' }],
      connect: profileTunConnect,
    },
  ],
  androidtv: [
    {
      name: 'Happ',
      icon: ICONS.Happ,
      installs: [{ label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.happproxy' }],
      instructions: [
        { title: 'Установка', text: 'Откройте страницу в Google Play и установите приложение.' },
        {
          title: 'Инструкции по установке',
          text: 'Подробные инструкции на русском и английском помогут настроить Happ на телевизоре — запросите их в Telegram боте.',
        },
      ],
      connect: 'Откройте приложение и подключитесь к серверу.',
    },
    {
      name: 'v2RayTun',
      icon: ICONS.v2RayTun,
      installs: [{ label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.v2raytun.android' }],
      instructions: [{ title: 'Установка', text: 'Откройте страницу в Google Play и установите приложение.' }],
      connect: 'Откройте QR-код на телевизоре и отсканируйте его в приложении v2RayTun со смартфона.',
    },
    {
      name: 'VPN4TV',
      icon: ICONS.VPN4TV,
      installs: [
        { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.vpn4tv.hiddify' },
        { label: 'Скачать APK', url: 'https://vpn4tv.com/download/vpn4tv.apk' },
      ],
      instructions: [
        {
          title: 'Установка',
          text: 'Установите приложение из Google Play или напрямую из APK-файла, если Google Play не работает.',
        },
      ],
      connect: 'Откройте приложение и подключитесь к серверу.',
    },
  ],
  appletv: [
    {
      name: 'Happ',
      icon: ICONS.Happ,
      installs: [{ label: 'App Store', url: 'https://apps.apple.com/app/happ-proxy-utility/id6504287215' }],
      instructions: [
        {
          title: 'Установка',
          text: 'Откройте страницу в App Store на Apple TV и установите приложение. Запустите его, разрешите VPN-конфигурацию и введите пароль.',
        },
        {
          title: 'Инструкции по установке',
          text: 'Подробные инструкции на русском и английском помогут настроить Happ на Apple TV — запросите их в Telegram боте.',
        },
      ],
      connect: 'Откройте приложение и подключитесь к серверу.',
    },
    {
      name: 'Shadowrocket',
      icon: ICONS.Shadowrocket,
      installs: [{ label: 'App Store', url: 'https://apps.apple.com/ru/app/shadowrocket/id932747118' }],
      instructions: [
        {
          title: 'Установка',
          text: 'Установите приложение из App Store. В окне разрешения VPN-конфигурации нажмите Allow и введите пароль.',
        },
      ],
      connect: powerButtonConnect,
    },
  ],
}

export const FAQ = [
  {
    q: 'Как установить VPN?',
    a: 'Выберите устройство, скачайте приложение и добавьте подписку, полученную в Telegram боте.',
  },
  { q: 'Какие устройства поддерживаются?', a: 'iOS, Android, Windows, macOS, Linux, Android TV и Apple TV.' },
  {
    q: 'Сколько устройств можно подключить?',
    a: 'От 3 до 15 в зависимости от тарифа. Точные условия смотрите в боте.',
  },
  {
    q: 'Почему банки и маркетплейсы не открываются с VPN?',
    a: 'Некоторые российские приложения блокируют доступ с зарубежных IP. Настройте правило маршрутизации: российские сервисы — напрямую, остальное — через VPN.',
  },
  { q: 'Как оплатить подписку?', a: 'Оплата и доступные способы представлены в Telegram боте.' },
]
