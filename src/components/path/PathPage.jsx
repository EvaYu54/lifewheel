import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function PathPage() {
  
    function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const v1 = formData.get("value1");
    const v2 = formData.get("value2");
    alert("Значения ответа 1- "+v1 +" и 2- "+v2);
  }
 
  /* return ( */
   /*  <div style={styles.page} className="animate-fade">
       <h1> Мои цели </h1>
        <form name="quiz" class="quizform" onSubmit={handleSubmit}>

<div class="quizsection">


	<h2>1. Здоровье и энергия</h2> */
	
	{/* <div class="answer">
		<input name="value1" value="0" type="range" min="0" max="10" /> Я просыпаюсь отдохнувшим и полным сил большую часть дней
	</div>

	<div class="answer">
		<input name="value2" value="2" type="range" min="0" max="10"  /> Я доволен своим текущим физическим состоянием и внешним видом
	</div> */}
    
{/* 
	<div class="answer">
		<input name="q1" value="value1" id="value3" type="range" min="0" max="10"  /> Я регулярно занимаюсь физической активностью (минимум 3 раза в неделю)
	</div>

	<div class="answer">
		<input name="q1" value="value1" id="value4" type="range" min="0" max="10"  /> Моё питание сбалансировано и я чувствую, что даю телу то, что ему нужно 
	</div>

	<div class="answer">
		<input name="q1" value="value1" id="value5" type="range" min="0" max="10"  /> Я сплю достаточное количество часов (7–9) и мой сон качественный
	</div>

	<div class="answer">
		<input name="q1" value="value1" id="value6" type="range" min="0" max="10"  /> У меня нет хронических болей или недомоганий, которые мешают мне жить
	</div>
    <div class="answer">
		<input name="q1" value="value1" id="value7" type="range" min="0" max="10"  /> Я справляюсь со стрессом и не чувствую постоянного эмоционального истощения
	</div>
    <div class="answer">
		<input name="q1" value="value1" id="value8" type="range" min="0" max="10"  /> Я регулярно прохожу медицинские обследования и забочусь о профилактике
	</div>
    <div class="answer">
		<input name="q1" value="value1" id="value9" type="range" min="0" max="10"  /> В течение дня у меня достаточно энергии, чтобы сделать всё запланированное
	</div>
    <div class="answer">
		<input name="q1" value="value1" id="value10" type="range" min="0" max="10"  /> Я чувствую, что мой уровень энергии сейчас выше среднего по сравнению с прошлым годом
	</div>

</div>

<div class="quizsection">

	<h2>2. Карьера и дело</h2>

	<div class="answer">
		<input name="q2" value="value1" id="value11" type="range" checked="checked" /> Мне нравится то, чем я занимаюсь профессионально
	</div>

	<div class="answer">
		<input name="q2" value="value2" id="value12" type="range" /> Я чувствую, что расту и развиваюсь в своей профессии
	</div>

	<div class="answer">
		<input name="q2" value="value1" id="value13" type="range" /> Мои навыки и компетенции востребованы на рынке
	</div>

	<div class="answer">
		<input name="q2" value="value1" id="value14" type="range" /> Я доволен своим текущим карьерным положением и статусом 
	</div>

	<div class="answer">
		<input name="q2" value="value1" id="value15" type="range" /> У меня есть чёткое понимание, куда я двигаюсь в карьере в ближайшие 1–3 года
	</div>

	<div class="answer">
		<input name="q2" value="value1" id="value16" type="range" /> Я чувствую, что мой труд справедливо оценивается и вознаграждается
	</div>
    <div class="answer">
		<input name="q2" value="value1" id="value17" type="range" /> Рабочие задачи вызывают у меня интерес, а не только усталость
	</div>
    <div class="answer">
		<input name="q2" value="value1" id="value8" type="range" /> Я эффективно управляю своим рабочим временем и не «горю»
	</div>
    <div class="answer">
		<input name="q2" value="value1" id="value9" type="range" /> У меня здоровые отношения с коллегами и/или руководством
	</div>
    <div class="answer">
		<input name="q2" value="value1" id="value10" type="range" /> Я чувствую, что моя работа приносит пользу и имеет значение
	</div>

</div>

<div class="quizsection">

	<h2>3. Финансы</h2>

	<div class="answer">
		<input name="q3" value="value1" id="value1" type="range" checked="checked" /> Мой текущий доход полностью покрывает мои потребности и желания
	</div>

	<div class="answer">
		<input name="q3" value="value1" id="value2" type="range" /> У меня есть финансовая подушка безопасности минимум на 3–6 месяцев
	</div>

	<div class="answer">
		<input name="q3" value="value2" id="value3" type="range" /> Я не испытываю тревоги, когда думаю о деньгах
	</div>

	<div class="answer">
		<input name="q3" value="value1" id="value4" type="range" /> Я веду учёт доходов и расходов и понимаю, куда уходят мои деньги
	</div>

	<div class="answer">
		<input name="q3" value="value1" id="value5" type="range" /> У меня нет долгов и кредитов, которые меня тяготят 
	</div>

	<div class="answer">
		<input name="q3" value="value1" id="value6" type="range" /> Я регулярно откладываю или инвестирую часть дохода
	</div>
    <div class="answer">
		<input name="q3" value="value1" id="value7" type="range" /> Я доволен динамикой своего дохода за последний год
	</div>
    <div class="answer">
		<input name="q3" value="value1" id="valu8" type="range" /> Я могу позволить себе спонтанные покупки без стресса для бюджета
	</div>
    <div class="answer">
		<input name="q3" value="value1" id="value9" type="range" /> У меня есть конкретный финансовый план на ближайшие 1–3 года
	</div>
    <div class="answer">
		<input name="q3" value="value1" id="value10" type="range" /> Я чувствую финансовую свободу и независимость
	</div>

</div>
<div class="quizsection">

	<h2>4. Отношения и семья</h2>

	<div class="answer">
		<input name="q4" value="value1" id="value1" type="range" checked="checked" /> Я чувствую себя любимым и принятым в своих близких отношениях 
	</div>

	<div class="answer">
		<input name="q4" value="value1" id="value2" type="range" /> У меня есть партнёр/супруг, с которым я могу быть полностью собой *(если не актуально — оцените желание и готовность)*
	</div>

	<div class="answer">
		<input name="q4" value="value1" id="value3" type="range" /> Мы с партнёром открыто и спокойно обсуждаем сложные темы
	</div>

	<div class="answer">
		<input name="q4" value="value2" id="value4" type="range" /> Я доволен качеством и количеством времени, которое провожу с семьёй 
	</div>

	<div class="answer">
		<input name="q4" value="value1" id="value5" type="range" /> У меня тёплые и доверительные отношения с родителями / родственниками
	</div>

	<div class="answer">
		<input name="q4" value="value1" id="value6" type="range" /> В моих отношениях больше поддержки и радости, чем конфликтов
	</div>
    <div class="answer">
		<input name="q4" value="value1" id="value7" type="range" /> Я умею выражать свои чувства и потребности близким людям
	</div>
    <div class="answer">
		<input name="q4" value="value1" id="valu8" type="range" /> Я чувствую, что даю и получаю в отношениях примерно поровну
	</div>
    <div class="answer">
		<input name="q4" value="value1" id="value9" type="range" /> Я доволен своей сексуальной и эмоциональной близостью 
	</div>
    <div class="answer">
		<input name="q4" value="value1" id="value10" type="range" /> Если бы я мог выбрать, я бы не стал менять ничего в своих главных отношениях
	</div>

</div>
<div class="quizsection">

	<h2>5. Личностный рост и развитие</h2>

	<div class="answer">
		<input name="q5" value="value1" id="value1" type="range" checked="checked" /> Я регулярно учусь чему-то новому (книги, курсы, тренинги, менторы)
	</div>

	<div class="answer">
		<input name="q5" value="value1" id="value2" type="range" /> Я хорошо знаю свои сильные стороны и зоны роста
	</div>

	<div class="answer">
		<input name="q5" value="value1" id="value3" type="range" /> За последние полгода я заметно изменился как личность
	</div>

	<div class="answer">
		<input name="q5" value="value1" id="value4" type="range" /> У меня есть чёткие цели, и я последовательно двигаюсь к ним
	</div>

	<div class="answer">
		<input name="q5" value="value2" id="value5" type="range" /> Я умею рефлексировать и извлекать уроки из своих ошибок
	</div>

	<div class="answer">
		<input name="q5" value="value1" id="value6" type="range" /> Я читаю или потребляю развивающий контент минимум несколько часов в неделю
	</div>
    <div class="answer">
		<input name="q5" value="value1" id="value7" type="range" /> Я работаю над своими вредными привычками и ограничивающими убеждениями
	</div>
    <div class="answer">
		<input name="q5" value="value1" id="valu8" type="range" /> Я чувствую, что мой потенциал реализуется, а не «спит» 
	</div>
    <div class="answer">
		<input name="q5" value="value1" id="value9" type="range" /> У меня есть наставник, коуч или среда, которая подталкивает меня к росту
	</div>
    <div class="answer">
		<input name="q5" value="value1" id="value10" type="range" /> Я доволен тем, каким человеком я становлюсь
	</div>

</div>
<div class="quizsection">

	<h2>6. Яркость жизни, хобби и отдых</h2>

	<div class="answer">
		<input name="q6" value="value1" id="value1" type="range" checked="checked" /> В моей жизни регулярно происходят яркие и запоминающиеся события
	</div>

	<div class="answer">
		<input name="q6" value="value1" id="value2" type="range" /> У меня есть хобби или увлечения, которые приносят мне искреннюю радость
	</div>

	<div class="answer">
		<input name="q6" value="value1" id="value3" type="range" /> Я позволяю себе полноценный отдых без чувства вины
	</div>

	<div class="answer">
		<input name="q6" value="value1" id="value4" type="range" /> Я путешествовал или планирую путешествия в ближайшее время
	</div>

	<div class="answer">
		<input name="q6" value="value1" id="value5" type="range" /> Я пробую что-то новое хотя бы раз в месяц (места, блюда, активности) 
	</div>

	<div class="answer">
		<input name="q6" value="value1" id="value6" type="range" /> Моя жизнь не сводится к маршруту «дом — работа — дом»
	</div>
    <div class="answer">
		<input name="q6" value="value2" id="value7" type="range" /> У меня есть «список желаний» (bucket list), и я его постепенно закрываю
	</div>
    <div class="answer">
		<input name="q6" value="value1" id="valu8" type="range" /> Я умею наслаждаться моментом и присутствовать «здесь и сейчас»
	</div>
    <div class="answer">
		<input name="q6" value="value1" id="value9" type="range" /> Я чувствую вкус к жизни и просыпаюсь с предвкушением нового дня
	</div>
    <div class="answer">
		<input name="q6" value="value1" id="value10" type="range" /> Если бы я оценивал свою жизнь как фильм, он был бы интересным и насыщенным
	</div>

</div>
<div class="quizsection">

	<h2>7. Окружение и социум</h2>

	<div class="answer">
		<input name="q7" value="value1" id="value1" type="range" checked="checked" /> Меня окружают люди, которые вдохновляют и поддерживают меня 
	</div>

	<div class="answer">
		<input name="q7" value="value1" id="value2" type="range" /> У меня есть 3–5 близких друзей, с которыми я могу быть откровенным
	</div>

	<div class="answer">
		<input name="q7" value="value1" id="value3" type="range" /> Я регулярно общаюсь с друзьями и не чувствую социальной изоляции
	</div>

	<div class="answer">
		<input name="q7" value="value1" id="value4" type="range" /> В моём окружении мало токсичных людей, которые тянут меня вниз
	</div>

	<div class="answer">
		<input name="q7" value="value1" id="value5" type="range" /> Я являюсь частью какого-либо сообщества или группы по интересам
	</div>

	<div class="answer">
		<input name="q7" value="value1" id="value6" type="range" /> Мои друзья разделяют мои ценности и амбиции
	</div>
    <div class="answer">
		<input name="q7" value="value7" id="value7" type="range" /> Я легко завожу новые знакомства, когда мне это нужно
	</div>
    <div class="answer">
		<input name="q7" value="value1" id="valu8" type="range" /> Я чувствую, что могу обратиться за помощью и её получу
	</div>
    <div class="answer">
		<input name="q7" value="value1" id="value9" type="range" /> Я сам являюсь ценным и надёжным другом для окружающих
	</div>
    <div class="answer">
		<input name="q7" value="value1" id="value10" type="range" /> Я доволен качеством своего социального круга в целом
	</div>

</div>

<div class="quizsection">

	<h2>8. Духовность и смыслы</h2>

	<div class="answer">
		<input name="q8" value="value1" id="value81" type="range" checked="checked" /> Я понимаю, зачем я живу и в чём мой главный смысл 
	</div>

	<div class="answer">
		<input name="q8" value="value1" id="value82" type="range" /> Я чувствую внутреннюю гармонию и спокойствие большую часть времени
	</div>

	<div class="answer">
		<input name="q8" value="value1" id="value83" type="range" /> У меня есть ценности и принципы, которые направляют мои решения
	</div>

	<div class="answer">
		<input name="q8" value="value1" id="value84" type="range" /> Я практикую осознанность, медитацию, молитву или другую духовную практику
	</div>

	<div class="answer">
		<input name="q8" value="value1" id="value85" type="range" /> Я чувствую связь с чем-то большим, чем я сам (вселенная, природа, Бог, человечество)
	</div>

	<div class="answer">
		<input name="q8" value="value1" id="value86" type="range" /> Я живу в согласии со своей совестью и не предаю себя
	</div>
    <div class="answer">
		<input name="q8" value="value1" id="value87" type="range" /> Я умею принимать то, что не могу изменить, и отпускать контроль
	</div>
    <div class="answer">
		<input name="q8" value="value2" id="valu88" type="range" /> Я чувствую благодарность за свою жизнь в целом
	</div>
    <div class="answer">
		<input name="q8" value="value1" id="value89" type="range" /> Я делаю что-то для других людей и мира, не ожидая ничего взамен
	</div>
    <div class="answer">
		<input name="q8" value="value1" id="value90" type="range" /> Я чувствую, что нахожусь на своём месте в этом мире
	</div> */}
/* </div>

<button type="submit">Отправить ответ</button>
<button type="reset">Сбросить все</button>
</form>
               </div> */
  /* ) */
  return(<input type="range" min="0" max="100" value="50"></input>)
}

const styles = {}