import { Translations } from "@aldabil/react-scheduler/types";

export const SchedulerLocale: Translations = {
  navigation: {
    month: "Месец",
    week: "Седмица",
    day: "Ден",
    today: "Днес",
    agenda: "Програма",
  },
  form: {
    addTitle: "Добавяне на събитие",
    editTitle: "Редактиране на събитие",
    confirm: "Потвърждение",
    delete: "Изтрий",
    cancel: "Отмени",
  },
  event: {
    title: "Заглавие",
    start: "Начало",
    end: "Край",
    allDay: "Цял ден",
  },
  validation: {
    required: "Задължително",
    invalidEmail: "Невалиден имейл",
    onlyNumbers: "Позволени са само цифри",
    min: "Минимум {{min}} букви",
    max: "Максимум {{max}} букви",
  },
  moreEvents: "Още...",
  noDataToDisplay: "Няма данни за показване",
  loading: "Зареждане...",
};
