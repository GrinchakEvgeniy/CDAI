function getPDF(){
		var HTML_Width = $("#pdf").width();
		var HTML_Height = $("#pdf").height();
		var top_left_margin = 15;
		var PDF_Width = HTML_Width+(top_left_margin*2);
		var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
		var canvas_image_width = HTML_Width;
		var canvas_image_height = HTML_Height;
		var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
		html2canvas($("#pdf")[0],{
			allowTaint:true,
			useCORS : true,
		}).then(function(canvas) {
			canvas.getContext('2d');
			var imgData = canvas.toDataURL("image/jpeg", 1.0);
			var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
		    pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
			// for (var i = 1; i <= totalPDFPages; i++) {
			// 	pdf.addPage(PDF_Width, PDF_Height);
			// 	pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
			// }

			// pdf.autoPrint({variant: 'javascript'});
		    // window.open(pdf.output('bloburl'), '_blank');
		});
	}

$( window ).on( "load", function() {
    console.log( "window loaded" );

    const mainResult = () => {
    	let result = 0;
		let fields = ["A", "B", "C", "D", "E", "F", "G", "H"];
		fields.forEach((element) => {
			let value = $(".result2-"+element).text();
			result += parseFloat(value);
		});
		$(".main_result").text(result.toFixed(1));
	}


    $('.print').click(()=>{
        console.log("print");
        $("#tools").hide();
		print();
		$("#tools").show();
        // getPDF();
    });

    $(".A-in").on('change', ()=>{
    	let sum = 0;
		$(".A-in").each((index, element)=>{
			let num = $(element).val();
			if(num){sum += parseInt(num);}
		});
		$(".result1-A").text(sum);
		$(".result2-A").text(sum*2);
		mainResult();
	})

	$(".B-in").on('change', ()=>{
    	let sum = 0;
		$(".B-in").each((index, element)=>{
			let num = $(element).val();
			if(num){
				if(num >= 4){alert("Value should be less than 4");$(element).val(""); return;}
				sum += parseInt(num);
			}
		});
		$(".result1-B").text(sum);
		$(".result2-B").text(sum*5);
		mainResult();
	})

	$(".C-in").on('change', ()=>{
    	let sum = 0;
		$(".C-in").each((index, element)=>{
			let num = $(element).val();
			if(num){
				if(num >= 5){alert("Value should be less than 5");$(element).val(""); return;}
				sum += parseInt(num);
			}
		});
		$(".result1-C").text(sum);
		$(".result2-C").text(sum*7);
		mainResult();
	})

	$(".D-in").on('change', ()=>{
    	let sum = 0;
		$(".D-in").each((index, element)=>{
			if($(element).is(':checked')){
				if(!$(element).hasClass("zero")){sum += 1;}
			}
		});
		$(".result1-D").text(sum);
		$(".result2-D").text(sum*20);
		mainResult();
	})

	$(".E-in").on('change', ()=>{
		if($(".E-in").is(':checked')){
			$(".result1-E").text(1);
			$(".result2-E").text(30);
		} else {
			$(".result1-E").text(0);
			$(".result2-E").text(0);
		}
		mainResult();
	})

	$(".F-in").on('change', ()=>{
		$(".F-in").each((index, element)=>{
			if($(element).is(':checked')){
				let num = $(element).val();
				$(".result1-F").text(num);
				$(".result2-F").text(parseInt(num)*10);
			}
		});
		mainResult();
	})

	$(".G-in").on('change', ()=>{
		let male = $("#m");
		let female = $("#f");
		if(male.val() && female.val()){
			alert("Enter Value for male or Female");
			male.val("");
			female.val("");
			$(".result1-G").text(0);
			$(".result2-G").text(0);
			mainResult();
			return;
		}
		if(male.val()){
			let res = 47 - parseInt(male.val());
			$(".result1-G").text(res);
			$(".result2-G").text(res*6);
			mainResult();
			return;
		}
		if(female.val()){
			let res = 42 - parseInt(female.val());
			$(".result1-G").text(res);
			$(".result2-G").text(res*6);
			mainResult();
			return;
		}
		$(".result1-G").text(0);
		$(".result2-G").text(0);
		mainResult();
	})

	$(".H-in").on('change', ()=>{
		let current = $("#c").val();
		let standard = $("#s").val();
		if(!current) current = 0;
		if(!standard){$(".result2-H").text(0);mainResult();return;}
		let result = 100 * (1 - (parseInt(current)/parseInt(standard)));
		$(".result2-H").text(result.toFixed(1));
		mainResult();
	})

	$(".reset").click(()=>{
		$('input[type=text]').val('');
		$('input[type=checkbox]').prop('checked', false);
		$('input[type=radio]').prop('checked', false);
		$(".result1-F").text(0);
		$(".result2-F").text(0);
		$("input").change();
		mainResult();
	});

});