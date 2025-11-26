import TelegramQR from "@public/tg-qr.svg";

export default function Footer() {
  return (
    <footer>
      <div className="w-full p-12 flex flex-row justify-around items-center bg-primary">
        <div className="flex w-fit flex-col p-5 gap-3 border border-outline font-bold">
          <div className="flex flex-col px-10 w-full items-center">
            <h1 className="text-background text-2xl">Telegram-канал</h1>
            <TelegramQR />
          </div>
          <div className="flex flex-col gap-2 py-2 border-t border-b border-outline">
            <p className="text-2xl text-background">8 800 800 80 80</p>
            <p className="text-xl text-muted">
              с 09:00 до 21:00 по МСК ежедневно
            </p>
          </div>
          <p className="text-xl text-background py-2">
            Будьте в курсе новостей и новинок
          </p>
          <form action="" className="text-xl flex flex-col gap-2">
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Ввести email и подписаться"
              className="border border-outline rounded-xs p-5 text-muted focus-visible:outline-none focus-visible:border-accent"
            ></input>
            <button
              type="submit"
              className="rounded-xs border border-muted p-5 text-left text-background hover:bg-accent hover:border-accent"
            >
              Подписаться
            </button>
          </form>
          <p className="text-md text-muted">
            Подписываясь на рассылку, вы соглашаетесь с <br />
            <a href="" className="text-accent">
              <span>политикой обработки персональных данных</span>
            </a>
          </p>
        </div>
        <div className="flex flex-row w-full justify-around align-baseline font-bold">
          <div className="flex flex-col h-1/2 gap-7 justify-baseline items-center text-background text-3xl text-center">
            <h1>О компании</h1>
            <div className="flex flex-col gap-5 items-center text-muted text-xl">
              <h2>Документы сайта</h2>
              <h2>
                Политика обработки персональных <br /> данных
              </h2>
              <h2>отзывы о нас</h2>
              <h2>кто мы</h2>
            </div>
          </div>
          <div className="flex flex-col h-1/2 gap-7 justify-baseline items-center text-background text-3xl">
            <h1>Клиентам</h1>
            <div className="flex flex-col gap-5 items-center text-muted text-xl">
              <h2>FAQ / частые вопросы</h2>
              <h2>Заказы и доставка</h2>
              <h2>Возврат и обмен</h2>
              <h2>Бонусная программа</h2>
              <h2>Гарантия качества</h2>
            </div>
          </div>
          <div className="flex flex-col h-1/2 gap-7 justify-baseline items-center text-background text-3xl">
            <h1>Контакты</h1>
            <div className="flex flex-col gap-5 items-center text-muted text-xl">
              <h2>Связь с руководcтвом</h2>
              <h2>Поставщикам</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row justify-center bg-accent text-background text-2xl py-5">
        <a href="">Получи до 100 бонусов за отзыв о товаре</a>
      </div>
    </footer>
  );
}
