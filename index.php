<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("description", "Купить квартиру в новостройке от Нижегородского застройщика в Ленинском районе");
$APPLICATION->SetPageProperty("keywords", "Андор, застройщик, ЖК, жилой комплекс, новостройка, квартира,  ЖК Бугров Ленинский район, купить квартиру");
use Bitrix\Highloadblock\HighloadBlockTable as HLBT;
$_SERVER["DOCUMENT_ROOT"] = realpath(dirname(__FILE__)."/..");
$DOCUMENT_ROOT = $_SERVER["DOCUMENT_ROOT"];
if (file_exists($_SERVER["DOCUMENT_ROOT"] . "/profitbase/vendor/autoload.php"))
    require_once $_SERVER["DOCUMENT_ROOT"] . "/profitbase/vendor/autoload.php";



$APPLICATION->SetTitle("ЖК «Бугров»");
$APPLICATION->SetPageProperty("title", "ЖК «Бугров» Нижний Новгород квартиры в новостройке в Ленинском районе");

$APPLICATION->SetPageProperty("og:image", "https://andornn.ru/local/templates/andor/images/bugrov/b2.jpg");

$zhkId = 2684;
global $USER;
//if ($USER->IsAuthorized()) {
function GetEntityDataClass($iHlBlockId) {
    if (empty($iHlBlockId) || $iHlBlockId < 1) {
        return false;
    }
    $hlblock = HLBT::getById($iHlBlockId)->fetch();
    $entity = HLBT::compileEntity($hlblock);
    $entity_data_class = $entity->getDataClass();
    return $entity_data_class;
}
?>
<style>

.yantar-page .project-gorod__list, .yantar-page .project-about, .yantar-page .project-calculator, .yantar-page .project-premises, .yantar-page .project-progress, .yantar-page .project-news, .yantar-page .project-documents, .yantar-page .project-choice {
     display: inherit; 
}
    </style>
<div class="yantar-page bugrov-page">
    <section id="jk-sections" class="choice-house">
        <!-- <img src="/local/templates/andor/images/bugrov/bugrov.jpg" alt="#" class="choice-house__bg"> -->
        <!-- <img src="/local/templates/andor/images/bugrov/b1.jpg" alt="#" class="choice-house__bg" style="display: none;"> -->
        <img src="/local/templates/andor/images/bugrov/b2.jpg" alt="#" class="choice-house__bg">

       
    </section>

    <div class="choice-house__mobile-info"></div>

    <section class="project-menu">
        <div class="project-menu__box">
            <div class="container">
                <ul class="project-menu__list">
                    <li> <a href="project-gorod">О проекте</a></li>
                    <li> <a href="project-infrastructure">Инфраструктура</a></li>
                    <li> <a href="project-calculator">Ипотека</a></li>
                    <li> <a href="project-progress">Ход строительства</a></li>
                    <li> <a href="project-developer">О застройщике</a></li>
                </ul><a class="my-button red icon1 project-menu__button" href="flats-list.php?house=43">Подбор квартиры</a>
            </div>
        </div>
    </section>

    <section class="project-gorod">
        <?php $res = CIBlockElement::GetByID($zhkId);
        if($zk = $res->GetNext())
            //d($zk);
        $value = [];
        $db_props = CIBlockElement::GetProperty(11, $zhkId, array("sort" => "asc"));
        while ($ob = $db_props->GetNext()) {

            $value[$ob['CODE']] = $ob['VALUE'];
            if($ob['CODE']=='about'){
                $abouts[] = ['name'=>$ob['DESCRIPTION'],'value'=>$ob['VALUE']];
            }
            if($ob['CODE']=='IMAGES_ABOUT'){
                $abouts_image[] = $ob['VALUE'];
            }
        }

        ?>
        <?php //d($value);?>

        <div class="container">
            <div class="project-gorod__title">
                <h2 class="block-title"><?=$zk['NAME']?></h2>
                <ul class="project-gorod__list">
                    <li>
                        <div>Минимальная цена</div><span>от <?=$value['START_PRICE']?> ₽</span>
                    </li>
                    <li>
                        <div>Сроки сдачи</div><span><?=$value['DEADLINE'];?></span>
                    </li>
                    <li>
                        <div>В ипотеку</div><span><?=$value['MORTGAGE'];?></span>
                    </li>
                </ul>
            </div>
            <div class="project-gorod__text content">
               <?=$zk['PREVIEW_TEXT']?>
            </div><a class="project-gorod__show-more" href="">Читать далее</a>
            <?php
                if(isset($value['BANNER_DESC'])) {
                    $banner = CFIle::GetPath($value['BANNER_DESC']);
                    $banner_mob = CFIle::GetPath($value['BANNER_DESC_MOBILE']);
                 ?>
                <?php if (isset($value['BANNER_DESC_LINK'])) { ?>
                <a href="<?php echo $value['BANNER_DESC_LINK'];?>" target="_blank">
                <?php } ?>
                <div class="project-gorod__banner"> <img src="<?=$banner?>" loading="lazy" alt="start-prodaz"><img class="img-mobile" src="<?=$banner_mob?>" loading="lazy" alt="start-prodaz"></div>
                <div class="project-gorod__banner-text"><?=$value['BANNER_DESC_BOTTOM']['TEXT'];?></div>
                <?php if (isset($value['BANNER_DESC_LINK'])) { ?>
                </a>
                <?php } ?>
            <?php }?>

        </div>
    </section>

    <section class="project-panorama">
        <div class="container">
            <div class="project-panorama__title">
                <h2 class="block-title">Панорама 360°</h2>
                <button class="my-button blue icon2 project-panorama__button">ЖК на карте</button>
            </div>
            <div class="project-panorama__main">
                <iframe class="panorama" src="/bugrov/bugrov_tour_new/index.html" frameborder="0" style="width: 100%; height: 100%;"></iframe>
            </div>
        </div>
    </section>

    <section class="project-infrastructure">
        <div class="container">
            <div class="project-infrastructure__title">
                <h2 class="block-title"><?$APPLICATION->IncludeComponent("bitrix:main.include",".default",Array(
                            "AREA_FILE_SHOW" => "file",
                            "PATH" => "/include/andorv2/title_bugrov.php",
                            "EDIT_TEMPLATE" => "",
                            "COMPONENT_TEMPLATE" => ".default"
                        ), false
                    );?></h2>
                <div class="project-infrastructure__text">
                    <?$APPLICATION->IncludeComponent("bitrix:main.include",".default",Array(
                        "AREA_FILE_SHOW" => "file",
                        "PATH" => "/include/andorv2/text_bugrov.php",
                        "EDIT_TEMPLATE" => "",
                        "COMPONENT_TEMPLATE" => ".default"
                    ), false
                    );?>
                </div>
            </div>
            <div class="project-infrastructure__arrows arrows"></div>
        </div>


        <div class="project-infrastructure__slider">

        <?php $arSelect = ['ID','PREVIEW_PICTURE', "NAME", "DETAIL_TEXT", "PROPERTY_ZK", "PROPERTY_time_walk", "PROPERTY_time_auto"];
        $arFilter = array("IBLOCK_ID" => 18, "ACTIVE" => "Y", 'PROPERTY_ZK' => $zhkId);
        $res = CIBlockElement::GetList(array('SORT' => 'ASC'), $arFilter, false,  array(), $arSelect);
        while ($el = $res->fetch()){ ?>
            <div>
                <a class="project-infrastructure__card"  data-id="<?=$el['ID']?>" data-zhk="<?=$zhkId?>" href="">
                    <div class="project-infrastructure__img"> <img src="<?=CFIle::GetPath($el['PREVIEW_PICTURE'])?>" alt="#"></div>
                    <div class="project-infrastructure__name"><?=$el['NAME']?></div>
                    <ul class="project-infrastructure__time">
                        <li><?=$el['PROPERTY_TIME_WALK_VALUE']?></li>
                        <li><?=$el['PROPERTY_TIME_AUTO_VALUE']?></li>
                    </ul>
                </a>
            </div>
        <?php } ?>
        </div>
    </section>





    <section class="project-about">
        <div class="container">
            <?php if(!empty($value['VIDEO'])) { ?>
                <?php //d($value);

                    if(!empty($value['VIDEO_PREVIEW']))
                        $url_preview = CFIle::GetPath($value['VIDEO_PREVIEW']);
                    else 
                        $url_preview = '/local/templates/andor/images/bugrov/bugrov_video.jpg';

                ?>
                
                <a class="project-about__video" href="<?=$value['VIDEO'];?>" data-fancybox="pjoject-video" style="background-image: url(<?=$url_preview?>);"> </a>
            <?php } ?>
            <div class="project-about__right">
                <h2 class="block-title">О жилом комплексе</h2>
                <ul class="project-about__list">
                    <?php foreach ($abouts as $about)  {
                        if(isset($abouts_image[$key]))
                            $style = 'style="background-image: url(\''.CFIle::GetPath($abouts_image[$key]).'\');"';
                        else 
                            $style = '';
                        ?>
                        <li <?=$style?>>
                            <div><?=$about['value']?></div><span><?=$about['name']?></span>
                        </li>
                    <? } ?>
                </ul>
            </div>
        </div>
    </section>

    <section class="project-choice">
        <div class="container">
            <h2 class="block-title">Выберите квартиру</h2>
            <button class="my-button red icon1 mobile-open-filter">Подбор квартиры</button>
            <div class="filter">
                <form class="main-filter" action="">
                    <?php $house = 44;
                    $arFilter = array("IBLOCK_ID" => 16, "ACTIVE" => "Y", 'IBLOCK_SECTION_ID' => $house, '=PROPERTY_STATUS' => "AVAILABLE");
                    $arSelect = array('ID', 'PROPERTY_space');
                    $db_space = CIBlockElement::GetList(Array("PROPERTY_space" => "DESC"), $arFilter, false, array("nPageSize"=>1), $arSelect);
                    while($ob_space = $db_space->GetNextElement()) {
                        $arSpaces = $ob_space->GetFields();
                        $maxSpace = $arSpaces['PROPERTY_SPACE_VALUE'];
                        $out['max_space'] = $maxSpace;
                        $out['start_max_space'] = $maxSpace;
                    }
                    $arFilter['>PROPERTY_space'] = 0;
                    $db_space = CIBlockElement::GetList(Array("PROPERTY_space" => "ASC"), $arFilter, false, array("nPageSize"=>1), $arSelect);
                    while($ob_space = $db_space->GetNextElement()) {
                        $arSpaces = $ob_space->GetFields();
                        $minSpace = $arSpaces['PROPERTY_SPACE_VALUE'];
                        $out['min_space'] = $minSpace;
                        $out['start_min_space'] = $minSpace;
                    }
                    $arSelect = array('ID', 'PROPERTY_price');
                    $db_price = CIBlockElement::GetList(Array("PROPERTY_price" => "DESC"), $arFilter, false, array("nPageSize"=>1), $arSelect);
                    while($ob_price = $db_price->GetNextElement()) {
                        $arPrices = $ob_price->GetFields();
                        $maxPrice = $arPrices['PROPERTY_PRICE_VALUE'];
                        $out['max_price'] = $maxPrice;
                        $out['start_max_price'] = $maxPrice;
                    }
                    $arFilter['>PROPERTY_price'] = 0;
                    $db_price = CIBlockElement::GetList(Array("PROPERTY_price" => "ASC"), $arFilter, false, array("nPageSize"=>1), $arSelect);
                    while($ob_price = $db_price->GetNextElement()) {
                        $arPrices = $ob_price->GetFields();
                        $minPrice = $arPrices['PROPERTY_PRICE_VALUE'];
                        $out['min_price'] = $minPrice;
                        $out['start_min_price'] = $minPrice;
                    }




                    ?>
                    <input type="hidden" name="type_form" value="filter">
                    <div class="filter__mobile-close"></div>
                    

                    <h2 class="filter__mobile-title">Выберите квартиру</h2>
                    <div class="filter__top">
                        <div class="filter__block-one">
                            <div class="filter__choice">
                                <div class="filter__choice-top">Дом 2</div>
                                <div class="filter__choice-window global-filter">
                                    <div class="form-item">
                                        <input type="radio" name="house" value="44" id="house1" checked="checked">
                                        <label for="house1">Дом 2</label>
                                    </div>
                                    <div class="form-item">
                                        <input type="radio" name="house" value="43" id="house2">
                                        <label for="house2">Дом 1</label>
                                    </div>
                                </div>
                            </div>
                            <div class="filter__rooms">
                                <h2>Комнаты:</h2>

                                <?php $arSelect = array('PROPERTY_count_rooms', 'IBLOCK_SECTION_ID');
                                $arFilter = array("IBLOCK_ID" => 16, "ACTIVE" => "Y", 'IBLOCK_SECTION_ID' => [$house, 43]);
                                $res = CIBlockElement::GetList(array(), $arFilter, ['PROPERTY_count_rooms', 'IBLOCK_SECTION_ID'], array(), $arSelect);
                                $i = 1;
                                while ($elCount = $res->fetch()){
                                    if($elCount['PROPERTY_COUNT_ROOMS_VALUE']){
                                      
                                        if($elCount['PROPERTY_COUNT_ROOMS_VALUE'] == 'Ст') 
                                            $rooms_count[0][$elCount['IBLOCK_SECTION_ID']]['value'] = 'Ст';
                                        else
                                            $rooms_count[$i][$elCount['IBLOCK_SECTION_ID']]['value'] = $elCount['PROPERTY_COUNT_ROOMS_VALUE'];
                                         
                                        $i++;
                                    }
                                }
                                
                                ksort($rooms_count);
                                ?>

                                <div class="filter__rooms-list">
                                    <?php foreach ($rooms_count as $key => $house_ids) {
                                        
                                            foreach ($house_ids as $key2 => $room_count) {
                                                if($key2!=$house)
                                                    $class=' disable';
                                                else
                                                    $class = '';
                                        ?>

                                                <div class="form-item<?=$class?> form-item__global" data-id-house="<?=$key2?>">
                                                    <input type="checkbox" value="<?=$room_count['value']?>" name="type[]" id="room<?=$key2.$key?>">
                                                    <label for="room<?=$key2.$key?>"><?=$room_count['value']?></label>
                                                </div>
                                    <?php }
                                            } ?>

                                </div>
                            </div>
                        </div>
                        <div class="filter__block-two">
                            <div class="filter__range area">
                                <div class="filter__range-title">Площадь</div>
                                <div class="filter__range-ot">от <span><?=number_format($out['min_space'], 2, ',', ' ')?></span> м<sup>2</sup></div>
                                <div class="filter__range-do">до <span><?=number_format($out['max_space'], 2, ',', ' ')?></span> м<sup>2</sup></div>
                                <div class="filter__toddler" id="area"></div>
                                <input type="hidden" name="min_space" value="<?=$out['min_space']?>">
                                <input type="hidden" name="max_space" value="<?=$out['max_space']?>">
                                <input type="hidden" name="start_min_space" value="<?=$out['start_min_space']?>">
                                <input type="hidden" name="start_max_space" value="<?=$out['start_max_space']?>">
                            </div>
                            <div class="filter__range cost">
                                <div class="filter__range-title">Цена</div>
                                <div class="filter__range-ot">от <span><?=number_format($out['min_price'],0,'', ' ')?></span> ₽</div>
                                <div class="filter__range-do">до <span><?=number_format($out['max_price'],0,'', ' ')?></span> ₽</div>
                                <div class="filter__toddler" id="cost"></div>
                                <input type="hidden" name="min_price" value="<?=$out['min_price']?>">
                                <input type="hidden" name="max_price" value="<?=$out['max_price']?>">
                                <input type="hidden" name="start_min_price" value="<?=$out['start_min_price']?>">
                                <input type="hidden" name="start_max_price" value="<?=$out['start_max_price']?>">
                            </div>
                        </div>
                    </div>
                    <div class="filter__bottom">
                        <div class="filter__block-three">
                            <?php $arSelect = ['PROPERTY_KITCHEN', 'PROPERTY_DRESSING', 'PROPERTY_BATHROOM', 'PROPERTY_STATUS', 'PROPERTY_MASTERBEDROOM'];
                            $arFilter = array("IBLOCK_ID" => 16, "ACTIVE" => "Y", 'IBLOCK_SECTION_ID' => $house, '=PROPERTY_status' => "AVAILABLE");
                            $res = CIBlockElement::GetList(array(), $arFilter, $arSelect, array(), $arSelect);
                            $prop['dressing'] = $prop['kitchen'] = $prop['bathroom'] = $prop['masterbedroom'] = 'disable';
                            while ($elProp = $res->fetch()){
                                if(!empty($elProp['PROPERTY_KITCHEN_VALUE']))
                                    $prop['kitchen'] = '';
                                if(!empty($elProp['PROPERTY_DRESSING_VALUE']))
                                    $prop['dressing'] = '';
                                if(!empty($elProp['PROPERTY_BATHROOM_VALUE']))
                                    $prop['bathroom'] = '';
                                if(!empty($elProp['PROPERTY_MASTERBEDROOM_VALUE']))
                                    $prop['masterbedroom'] = '';
                            }
                            ?>
                            <h2>Дополнительные параметры:</h2>
                            <div class="filter__parameters">
                                <div class="filter__parameters-item <?=$prop['dressing']?>" data-id="dressing">
                                    <input type="checkbox" name="dressing" id="feature1">
                                    <label for="feature1">С гардеробной</label>
                                </div>
                                <div class="filter__parameters-item <?=$prop['kitchen']?>" data-id="kitchen">
                                    <input type="checkbox" name="kitchen" id="feature2">
                                    <label for="feature2">Кухня у окна</label>
                                </div>
                                <div class="filter__parameters-item <?=$prop['bathroom']?>" data-id="bathroom">
                                    <input type="checkbox" name="bathroom" id="feature3">
                                    <label for="feature3">Раздельный санузел</label>
                                </div>
                                <div class="filter__parameters-item <?=$prop['masterbedroom']?>" data-id="masterbedroom">
                                    <input type="checkbox" name="masterbedroom" id="feature4">
                                    <label for="feature4">С мастер спальней</label>
                                </div>
                            </div>
                        </div>
                        <div class="filter__button-box">
                            <div>
                                <button class="my-button red icon1 filter__button url">Подобрать квартиру</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <section class="project-advantages">
        <div class="container">
            <h2 class="block-title">Преимущества ЖК</h2>
            <div class="project-advantages__arrows arrows"></div>
        </div>
        <div class="project-advantages__slider">
            <?php $arSelect = ['ID','PREVIEW_PICTURE', "NAME", "DETAIL_TEXT", "PROPERTY_ZK"];
            $arFilter = array("IBLOCK_ID" => 19, "ACTIVE" => "Y", 'PROPERTY_ZK' => $zhkId);
            $res = CIBlockElement::GetList(array('SORT' => 'ASC'), $arFilter, false,  array(), $arSelect);
            while ($el = $res->fetch()){ ?>
                <div class="project-advantages__slide">
                    <a class="project-advantages__card"  data-id="<?=$el['ID']?>" data-zhk="<?=$zhkId?>" href="">
                        <div class="project-advantages__img"> <img src="<?=CFIle::GetPath($el['PREVIEW_PICTURE'])?>" alt="#"></div>
                        <div class="project-advantages__name"><?=$el['NAME']?></div>
                    </a>
                </div>
            <?php } ?>

        </div>
    </section>

    <section class="project-calculator">
        <div class="container">
            <h2 class="block-title">Ипотечный калькулятор</h2>
            <div class="project-calculator__main">
                <div class="mortgage-page__calculator-form">
                    <div class="new-mortgage-calculator" id="new-mortgage-calculator">
                        <div class="row">
                            <div class="col-xl-6">
                                <div class="new-mortgage-calculator__row">
                                    <div class="new-mortgage-calculator__name">Процентная ставка</div>
                                    <div class="new-mortgage-calculator__slider-wrap">
                                        <input class="new-mortgage-calculator__value" id="new-rate-input" />
                                        <div class="new-nouislider" id="new-rate-slider"></div>
                                    </div>
                                </div>
                                <div class="new-mortgage-calculator__row">
                                    <div class="new-mortgage-calculator__name">Стоимость недвижимости</div>
                                    <div class="new-mortgage-calculator__slider-wrap"><input class="new-mortgage-calculator__value" id="new-cost-input" />
                                        <div class="new-nouislider" id="new-cost-slider"></div>
                                    </div>
                                </div>
                                <div class="new-mortgage-calculator__row">
                                    <div class="new-mortgage-calculator__name">Первоначальный взнос
                                        <div class="project-calculator__first-percent">15</div></div>
                                    <div class="new-mortgage-calculator__slider-wrap"><input class="new-mortgage-calculator__value" id="new-first-payment-input" />
                                        <div class="new-nouislider" id="new-first-payment-slider"></div>
                                    </div>
                                </div>
                                <div class="new-mortgage-calculator__row">
                                    <div class="new-mortgage-calculator__name">Срок ипотечного кредита</div>
                                    <div class="new-mortgage-calculator__slider-wrap"><input class="new-mortgage-calculator__value" id="new-time-limit-input" />
                                        <div class="new-nouislider" id="new-time-limit-slider"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="offset-xl-1 col-xl-4">
                                <div class="new-mortgage-calculator__result">
                                    <div class="roc roc_calc" id="new-credit-summ-output">
                                        <div class="roc__name">Стоимость кредита</div>
                                        <div class="ellipsis"></div>
                                        <div class="roc__value"><span>1 858 550</span> ₽</div>
                                    </div>
                                    <div class="roc  roc_calc" id="new-motnh-payment-output">
                                        <div class="roc__name">Ежемесячный платеж</div>
                                        <div class="ellipsis"></div>
                                        <div class="roc__value"><span>32 859</span> ₽</div>
                                    </div>
                                    <div class="roc  roc_calc" id="new-required-income-output">
                                        <div class="roc__name">Необходимый доход </div>
                                        <div class="ellipsis"></div>
                                        <div class="roc__value"><span>52 575</span> ₽</div>
                                    </div>
                                </div><a class="payment-schedule-btn my-button black project-calculator__button" href="#" id="new-payment-schedule-btn">График платежей</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="project-premises">
        <div class="container">
            <h2 class="block-title">Нежилые помещения в ЖК</h2>
            <ul class="project-premises__list">
                <?php $arSelect = ['ID','PREVIEW_PICTURE', "NAME", "PREVIEW_TEXT", "DETAIL_TEXT", "PROPERTY_ZK", "PROPERTY_link"];
                $arFilter = array("IBLOCK_ID" => 20, "ACTIVE" => "Y", 'PROPERTY_ZK' => $zhkId);
                $res = CIBlockElement::GetList(array('SORT' => 'ASC'), $arFilter, false,  array(), $arSelect);
                while ($el = $res->fetch()){ ?>
                    <li>
                        <a class="project-premises__card" data-id="<?=$el['ID']?>" data-zhk="<?=$zhkId?>" href="<?=$el['PROPERTY_LINK_VALUE']?>">
                            <div class="project-premises__img"> <img src="<?=CFIle::GetPath($el['PREVIEW_PICTURE'])?>" alt="#"></div>
                            <div class="project-premises__name"><?=$el['NAME']?></div>
                            <div class="project-premises__text"><?=$el['PREVIEW_TEXT']?></div>
                        </a>
                    </li>
                <?php } ?>
            </ul>
        </div>
    </section>
    <?php

        $month_select = $year_select = $progress = [];
        $entity_data_class = getHighloadData(10);
        $rsData = $entity_data_class::getList(array( "select" =>  array("*"), "filter" => array('UF_HOUSE'=> [$house, 43]), "order" => array('UF_YEAR'=>'DESC','UF_MONTH'=>'DESC') ));
        while ($hlData = $rsData -> Fetch()):
            //d($hlData);

            $month = CUserFieldEnum::GetList( array(), array('ID' =>$hlData['UF_MONTH']))->Fetch()['VALUE'];
            $month_select[$month] = $month;
            $year = CUserFieldEnum::GetList( array(), array('ID' =>$hlData['UF_YEAR']))->Fetch()['VALUE'];
            $year_select[$year] = $year;
            //$image = CFile::GetPath(array_shift ($hlData['UF_GALLERY']));
            foreach ($hlData['UF_GALLERY'] as $gallery){
                $images[$hlData['ID']][] = CFIle::GetPath($gallery);
            }

            $file = CFile::ResizeImageGet(array_shift($hlData['UF_GALLERY']), array('height' => 385), BX_RESIZE_IMAGE_PROPORTIONAL, false, false, false, 80);

            $progress[$hlData['ID']] = [
                'year' => $year,
                'month' => $month,
                'first_image' => $file['src'],
                'house' => $hlData['UF_HOUSE'],
                'images' => $images[$hlData['ID']],
                'type' => 'photo'
            ];
            ?>

        <? endwhile; ?>

        <?
        $entity_data_class = getHighloadData(4);
        $rsData = $entity_data_class::getList(array( "select" =>  array("*"), "filter" => array('UF_HOUSE'=>[$house, 43]), "order" => array('UF_YEAR'=>'DESC','UF_MONTH'=>'DESC') ));
        while ($hlData = $rsData -> Fetch()):

            $month = CUserFieldEnum::GetList( array(), array('ID' =>$hlData['UF_MONTH']))->Fetch()['VALUE'];
            $month_select[$month] = $month;
            $year = CUserFieldEnum::GetList( array(), array('ID' =>$hlData['UF_YEAR']))->Fetch()['VALUE'];
            $year_select[$year] = $year;

            $progress['video-'.$hlData['ID']] = [
                'year' => $year,
                'month' => $month,
                'first_image' => CFile::GetPath($hlData['UF_PREVIEW']),
                'url' => $hlData['UF_VIDEO_URL'],
                'house' => $hlData['UF_HOUSE'],
                'images' => [],
                'type' => 'video'
            ];
            ?>
        <? endwhile; ?>




    <section class="project-progress">
        <div class="container">
            <h2 class="block-title">Ход строительства</h2>
            <div class="project-progress__filters">
                <div class="project-progress__left">
                    <div class="project-progress__tabs"> <a class="active" href="" data-type="photo">Фото</a><a href="" data-type="video">Видео</a></div>
                    <div class="project-progress__select house">
                        <select class="select" data-title="Выбор дома">
                            <option data-number-house="44" selected="selected">Дом 2</option>
                            <option data-number-house="43">Дом 1</option>
                        </select>
                    </div>
                    <div class="project-progress__select year">
                        <select class="select" data-title="Выбор года">
                            <?php foreach ($year_select as $key => $year) {
                               print '<option data-year="'.$key.'">'.$year.'</option>';
                            }?>
                        </select>
                    </div>
                    <div class="project-progress__select month">
                        <select class="select" data-title="Выбор месяца">
                            <?php foreach ($month_select as $key => $month) {
                                print '<option data-month="'.$key.'">'.$month.'</option>';
                            }?>
                        </select>
                    </div>
                </div>


                <?php
                $house_entity = CIBlockSection::GetList(["SORT" => "ASC"], [ "IBLOCK_ID" => 16], false, ['ID', 'UF_ONLINE'], false);


                while ($el = $house_entity->fetch()) { ?>
                    <a class="my-button blue project-progress__online" href="javascript:;" style="display:none;" data-fancybox="camera-<?=$el['ID']?>" data-number-house="<?=$el['ID']?>" data-src="#online-translation-<?=$el['ID']?>">Онлайн камера</a>
                    <div class="popup popup_lg-wop" id="online-translation-<?=$el['ID']?>" role="dialog">
                        <div class="popup__inner">
                            <iframe class="iv-i" style="display:block;margin:0;padding:0;border:0;" src="<?=$el['UF_ONLINE']?>" width="960" height="720" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                <?php  } ?>




            </div>
            <div class="project-progress__slider">
                <?php foreach ($progress as $key => $progres) {
                    $url = $progres['first_image'];
                    if($progres['type'] == 'video'){
                        $url = $progres['url'];
                    }
                    ?>

                    <div class="project-progress__slide" data-type="<?=$progres['type']?>" data-number-house="<?=$progres['house']?>" data-year="<?=$progres['year']?>" data-month="<?=$progres['month']?>">
                        <a class="<?=$progres['type']?> project-progress__card" href="<?=$url?>" data-fancybox="<?=$key?>">
                            <img src="<?=$progres['first_image']?>" loading="lazy" alt="#">
                            <div class="project-progress__date"><?=$progres['month']?> <?=$progres['year']?> г.</div>
                            <div class="project-progress__label"><?php if($progres['type'] == 'video') {?>Видео<?php } else {?><?=count($progres['images'])?> Фото<?php } ?>
                            </div>
                        </a>
                        <div style="display: none;">
                            <?php foreach ($progres['images'] as $img_key => $img) {
                                if($img_key>0)
                                    print '<a href="'.$img.'" data-fancybox="'.$key.'"></a>';
                            }?>
                        </div>
                    </div>
                <?php } ?>

            </div>
            <div class="project-progress__arrows arrows"></div>
            <div class="project-progress__empty-text">По вашему запросу ничего не найдено</div>
        </div>
    </section>

    <section class="project-news">
        <div class="container">
            <h2 class="block-title">Новости</h2>
            <ul class="project-news__list">
                <?php $arSelect = ['*'];
                    $arFilter = array("IBLOCK_ID" => 6, "ACTIVE" => "Y", 'PROPERTY_ZK' => $zhkId, '<=DATE_ACTIVE_FROM' => date('d.m.Y H:i:s'));
                    $res = CIBlockElement::GetList(array("DATE_ACTIVE_FROM"=>"DESC"), $arFilter, $arSelect, array("nTopCount" => 10), $arSelect);
                    while ($elProp = $res->fetch()){
                        $date = strtotime($elProp['DATE_ACTIVE_FROM']);
                        $date = date('d.m.Y', $date);
                        ?>
                        <li> <a class="project-news__card" data-id="<?=$elProp['ID']?>" data-zhk="<?=$zhkId?>" href="">
                                <div class="project-news__date"><?=$date?></div>
                                <div class="project-news__name"><?=$elProp['NAME']?></div>
                                <div class="project-news__description"><?=$elProp['PREVIEW_TEXT']?></div></a>
                        </li>
                    <?php } ?>

            </ul><a class="my-button transparent project-news__all" href="/kompaniya/novosti/">Смотреть все</a>
        </div>
    </section>

    <section class="project-developer">
        <div class="container">
            <h2 class="block-title">О застройщике</h2>
            <div class="project-developer__main">
                <div class="project-developer__img"> <img src="/local/templates/andor/andorv2/img/project/developer.png" alt="developer"></div>
                <div class="project-developer__text content">
                    <?$APPLICATION->IncludeComponent("bitrix:main.include",".default",Array(
                        "AREA_FILE_SHOW" => "file",
                        "PATH" => "/include/andorv2/about.php",
                        "EDIT_TEMPLATE" => "",
                        "COMPONENT_TEMPLATE" => ".default"
                    ), false
                    );?>

                </div>
            </div>
        </div>
    </section>

    <section class="project-documents">
        <div class="container">
            <div class="project-documents__title">
                <h2 class="block-title">Документы</h2>
                <div class="project-documents__title-text">Информация о застройщике и строящихся домах, в том числе разрешительная и проектная документация размещены на сайте <a href="https://наш.дом.рф/сервисы/каталог-новостроек/список-объектов/список?&devId=3156&objStatus=0" target="_blank">наш.дом.рф</a> </div>
            </div>
            <ul class="project-documents__list">
                <?php
                $entity_data_class = getHighloadData(13);
                $rsData = $entity_data_class::getList(array( "select" =>  array("*"), "filter" => array('UF_JK'=> $zhkId), "order" => array('ID'=>'ASC') ));
                while ($hlData = $rsData -> Fetch()){
                    //d($hlData);
                    $file  = CFIle::GetPath($hlData['UF_DOC']);
                    $fileinfo = pathinfo($file);
                    ?>
                <li> <a class="project-documents__card" href="<?=$file?>" download>
                        <div class="project-documents__name"><?=$hlData['UF_TITLE'];?></div>
                        <div class="project-documents__file">Документ скачается в формате <?=$fileinfo['extension']?></div></a></li>
                <?php } ?>

            </ul><a class="my-button black project-documents__all" href="/poleznaya-informatsiya/razreshitelnye-dokumenty/">Все документы</a>
        </div>
    </section>

    <footer class="footer">
        <div class="footer__box"></div>
    </footer>

    <div class="mobile-projects">
        <button class="my-button blue mobile-projects__button">Жилые комплексы</button>
        <div class="mobile-projects__window">
            <div class="mobile-projects__close"></div>
            <ul class="mobile-projects__list">
                <li> <a href="/gorod-vremeni/">ЖК «Город времени»</a></li>
                <li> <a href="/yantar">ЖК «Янтарь»</a></li>
                <li> <a href="/bugrov/">ЖК «Бугров»</a></li>
                <li> <a href="/med/">ЖК «Мед»</a></li>
            </ul>
        </div>
    </div>

    <div class="window__container window-bron">
        <div class="window">
            <div class="window__close"></div>
            <h2>Забронировать квартиру</h2>
            <h3>Хотите забронировать квартиру? Оставьте заявку, и наш менеджер проконсультирует вас.</h3>
            <form action="">
                <div><!-- div drupal -->
                    <input class="form__field" type="text" required="required" placeholder="Ваше имя">
                </div>
                <div><!-- div drupal -->
                    <input class="form__field mask-tel" type="tel" required="required" placeholder="Ваш телефон">
                </div>
                <div class="form__bottom">
                    <div class="form__button">
                        <div><!-- div drupal -->
                            <input class="my-button red" type="submit" value="Отправить">
                        </div>
                    </div>
                    <div class="form__agree">Отправляя форму, Вы даете <a href="/upload/iagree2018.docx" target="_blank">согласие на обработку персональных данных</a></div>
                </div>
                <input type="hidden" name="jkid" value="<?=$zhkId?>">

            </form>
        </div>
    </div>

    <div class="window__container window-konsul">
        <div class="window">
            <div class="window__close"></div>
            <h2>Есть вопрос по ипотеке?</h2>
            <h3>Оставьте заявку, и наш ипотечный специалист проконсультирует вас и поможет с одобрением заявки в банк с максимально выгодной процентной ставкой.</h3>
            <form action="">
                <div><!-- div drupal -->
                    <input class="form__field" type="text" required="required" placeholder="Ваше имя">
                </div>
                <div><!-- div drupal -->
                    <input class="form__field mask-tel" type="tel" required="required" placeholder="Ваш телефон">
                </div>
                <div class="form__bottom">
                    <div class="form__button">
                        <div><!-- div drupal -->
                            <input class="my-button red" type="submit" value="Отправить">
                        </div>
                    </div>
                    <div class="form__agree">Отправляя форму, Вы даете <a href="/upload/iagree2018.docx" target="_blank">согласие на обработку персональных данных</a></div>
                </div>
                <input type="hidden" name="jkid" value="<?=$zhkId?>">

            </form>
        </div>
    </div>

    <div class="window__container window-map">
        <div class="window">
            <div class="window__close"></div>
            <div class="window-map__map">
                <script type="text/javascript" charset="utf-8" data-skip-moving="true" async src="<?=$value['map']?>"></script>
            </div>
        </div>
    </div>

    <div class="big-window window-infrastructure">
        <div class="big-window__close"></div>
        <div class="container">

        </div>
    </div>

    <div class="big-window window-advantage">
        <div class="big-window__close"></div>
        <div class="container">

        </div>
    </div>

    <div class="big-window window-premises">
        <div class="big-window__close"></div>
        <div class="container">

        </div>
    </div>


    <div class="big-window window-news">
        <div class="big-window__close"></div>
        <div class="container">

        </div>
    </div>
</div>
<!--    <div class="big-window window-otdelka">-->
<!--        <div class="big-window__close"></div>-->
<!--        <div class="container">-->
<!--            <div class="big-window__top">-->
<!--                <div class="big-window__title">Предчистовая отделка</div>-->
<!--                <div class="big-window__text content">-->
<!--                    <p>Все квартиры наших жилых комплексов передаются владельцам в предчистовой отделке. Это значит, что помещение полностью готово к последующему косметическому ремонту. Например, на фотографии видно, как выглядели готовые к сдаче квартиры в ЖК «Олимпийский»:</p>-->
<!--                    <ul>-->
<!--                        <li>Стены оштукатурены и полностью готовы к декоративной отделке.</li>-->
<!--                        <li>На полу выполнена выравнивающая цементная стяжка, а потолок готов к установке натяжного полотна.</li>-->
<!--                        <li>Остекление — окна из ПВХ профиля с 2-камерным стеклопакетом. Остекление лоджий — одинарное оконное стекло в переплёте из ПВХ.</li>-->
<!--                        <li>Двери — установлена временная деревянная входная дверь с замком, которую легко заменить на надёжную металлическую.</li>-->
<!--                        <li>Холодное и горячее водоснабжение — установлены стояки для подключения сантехнических приборов, установлены счетчики учета холодной и горячей воды.</li>-->
<!--                        <li>Канализация — установлены стояки для подключения сантехнических приборов.</li>-->
<!--                        <li>Отопительная система — Тепло в доме поддерживает не только уютная семейная атмосфера, но и установленные приборы отопления (биметаллические секционные радиаторы). Кстати, теперь в наших жилых комплексах система отопления имеет горизонтальную разводку в полу, выходы выполнены из стены в местах крепления радиаторов. Никаких лишних труб в интерьере.</li>-->
<!--                        <li>Электрическая система — выполнена разводка электрических проводов до места подключения электроприборов, установлены выключатели, розетки, электрический счетчик.</li>-->
<!--                    </ul>-->
<!--                    <p>Владельцам квартир остаётся самое приятное: дизайн интерьера, выбор мебели, домашнего текстиля, посуды и бытовой техники. Мы сделали всю грязную и шумную работу за вас, чтобы период от получения ключей до новоселья был как можно короче.</p>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="big-window__slider window-advantage__slider arrows">-->
<!--                <div> <img src="/local/templates/andor/andorv2/img/flat/otdelka.jpg" alt="#"></div>-->
<!--                <div> <img src="/local/templates/andor/andorv2/img/flat/otdelka.jpg" alt="#"></div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->

   <?php // } ?>

   <!--profitbase -->
<?php /*
<script async>
    !function(e,t){var i=e.getElementsByTagName("script")[0];n=e.createElement("script"),n.src="https://pb4104.profitbase.ru/assets/js/sw.js",n.async=!0,n.onload=function(){t.pb_front_widget.init("https://pb4104.profitbase.ru/api/v2/json/sitewidget/widget",{ pb_api_key:"930be2a2244fcc3bac6e2a0d0039c33a", project_id: 38623})},i.parentNode.insertBefore(n,i)}(document,window);
</script>

<style type="text/css">
    .pb-widget-button {
        visibility: hidden!important;
    }
</style>
<!-- end profitbase -->
<?php */?>

<?php // } ?>

 <?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>